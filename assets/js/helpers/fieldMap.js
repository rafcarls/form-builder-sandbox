import { CUSTOM_FIELD_TYPE, CUSTOM_INPUT_SETS, CBO_DATALIST_ID } from "./constants.js";
import { createDatalist, bindDatalist } from "./dom.js";
import { getCBOData, keepOnlyDigits } from "./utils.js";
import { isValidURL } from "./validation.js";

// #region Campos customizados

/**
 * Cache dos dados do CBO carregados via fetch.
 * Evita requisições repetidas ao mesmo arquivo JSON.
 *
 * @type {Array<{codigo: string, titulo: string}>|null}
 */
let cboDataCache = null;

/**
 * Função de fetch dos dados do CBO adaptada ao formato `{value, label}`.
 *
 * @returns {Promise<Array<{value: string, label: string}>>}
 */
async function fetchCBOData() {
    const data = await getCBOData(cboDataCache);

    return data.map(({ codigo, titulo }) => ({ value: codigo, label: titulo }));
}

/**
 * Mapeia um campo CBO ao seu datalist correspondente.
 *
 * Indicado para uso no formBuilder, via evento `onAddFieldAfter`.
 *
 * @async
 * @param {string} fieldId - ID do campo criado pelo formBuilder.
 * @param {Object} fieldData - Objeto contendo os metadados do campo adicionado pelo formBuilder.
 * @returns {Promise<void>}
 */
export async function mapCBODatalist(fieldId, fieldData) {
    if (!fieldData.className.includes(CUSTOM_FIELD_TYPE.cbo.class)) return;

    await createDatalist(CBO_DATALIST_ID, fetchCBOData);

    const input = document.querySelector(`#${fieldId} input`);

    if (input) bindDatalist(input, CBO_DATALIST_ID);
}

/**
 * Inicializa o datalist do CBO para todos os campos já renderizados no elemento raiz.
 *
 * Indicado para uso no formRender, onde os campos são renderizados de uma vez
 * e não há evento `onAddFieldAfter`.
 *
 * @async
 * @param {HTMLElement} root - Elemento raiz que contém os campos renderizados.
 * @returns {Promise<void>}
 */
export async function initCBODatalist(root) {
    const cboFields = root.querySelectorAll(`.${CUSTOM_FIELD_TYPE.cbo.class}`);

    if (!cboFields.length) return;

    await createDatalist(CBO_DATALIST_ID, fetchCBOData);

    cboFields.forEach((input) => bindDatalist(input, CBO_DATALIST_ID));
}

/**
 * Inicializa os campos de hiperlink customizados dentro do elemento raiz.
 *
 * Varre o DOM em busca de campos com a classe do tipo hiperlink e registra
 * o evento de clique para abrir a URL em nova aba. O campo hiperlink é baseado
 * no tipo `header` (subtipo `h6`) do formBuilder, cujo conteúdo de texto
 * é interpretado como URL.
 *
 * Indicado para uso no `formRender`, após os campos serem renderizados.
 *
 * @param {HTMLElement} root - Elemento raiz que contém os campos renderizados.
 * @returns {void}
 */
export function initHyperlinkField(root) {
    const hyperlinkFields = root.querySelectorAll(`.${CUSTOM_FIELD_TYPE.hiperlink.class}`);

    if (!hyperlinkFields.length) return;

    hyperlinkFields.forEach((hyperlink) => {
        const url = hyperlink.innerText.trim();

        if (!isValidURL(url)) return;

        hyperlink.addEventListener("click", () => window.open(url, "_blank"));
    });
}

// #endregion

// #region Conjuntos de campos customizados

/**
 * Referência ao identificador único do agrupamento de CEP em andamento.
 *
 * Armazena a classe CSS gerada dinamicamente via `crypto.randomUUID()`
 * que vincula todos os campos de um mesmo conjunto de CEP.
 * É `null` quando nenhum agrupamento está ativo.
 *
 * @type {string|null}
 */
let cepGroupRef = null;

/**
 * Mapeia e vincula os campos pertencentes a um agrupamento baseado em CEP.
 *
 * - Detecta o primeiro campo do conjunto (`fb-field-cep`) e cria um identificador único.
 * - Aplica esse identificador como classe CSS aos campos subsequentes do conjunto.
 * - Atualiza o `fieldData.className` e o campo `.fld-className` do formBuilder.
 * - Quando o último campo (`fb-field-complemento`) é detectado, encerra o agrupamento.
 *
 * @param {string} fieldId - ID do campo criado pelo formBuilder.
 * @param {Object} fieldData - Objeto contendo os metadados do campo adicionado pelo formBuilder.
 * @returns {void}
 */
export function mapCepFieldGroup(fieldId, fieldData) {
    const inputSetClass = CUSTOM_INPUT_SETS.cep.class;

    const isCepGroupStart =
        fieldData.className && fieldData.className.includes(`${inputSetClass} ${CUSTOM_FIELD_TYPE.cep.class}`);

    if (isCepGroupStart) cepGroupRef = `${inputSetClass}-${crypto.randomUUID()}`;

    if (cepGroupRef) {
        const fieldElement = document.querySelector(`#${fieldId} .${inputSetClass}`);

        if (!fieldElement) return;

        fieldElement.classList.add(cepGroupRef);

        fieldData.className += ` ${cepGroupRef}`;

        const classNameInput = document.querySelector(`#${fieldId} .className-wrap .fld-className`);

        if (!classNameInput) return;

        classNameInput.value += ` ${cepGroupRef}`;

        const isCepGroupEnd = fieldData.className.includes(`${inputSetClass} fb-field-complemento`);

        if (isCepGroupEnd) cepGroupRef = null;
    }
}

/**
 * Consulta o serviço ViaCEP e preenche automaticamente os campos do conjunto.
 *
 * - Extrai os dígitos do CEP informado.
 * - Verifica se o CEP possui 8 caracteres válidos.
 * - Identifica a classe dinâmica que vincula os campos do conjunto.
 * - Consulta a API do ViaCEP.
 * - Preenche automaticamente os campos do grupo correspondente.
 *
 * @async
 * @param {HTMLInputElement} cepInput - Campo de input onde o CEP foi digitado.
 * @returns {Promise<void>}
 * @see {@link https://viacep.com.br/|ViaCEP}
 */
export async function fetchCepFromViaCep(cepInput) {
    const cep = keepOnlyDigits(cepInput.value);

    const cepGroupClass = Array.from(cepInput.classList).find((className) => className.startsWith("fb-input-set-cep-"));

    if (!cepGroupClass) return;

    const fields = document.querySelectorAll(`.${cepGroupClass}`);

    const clearAddressFields = () => {
        fields.forEach((field) => {
            if (field.tagName === "SELECT") {
                field.selectedIndex = 0;
                return;
            }

            field.value = "";
        });
    };

    if (cepInput.classList.contains("is-invalid")) {
        clearAddressFields();
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            console.warn("CEP não encontrado.");

            clearAddressFields();

            return;
        }

        fields.forEach((field) => {
            if (field.classList.contains("fb-field-logradouro")) field.value = data.logradouro || "";
            if (field.classList.contains("fb-field-bairro")) field.value = data.bairro || "";
            if (field.classList.contains("fb-field-localidade")) field.value = data.localidade || "";
            if (field.classList.contains("fb-field-uf")) field.value = data.uf || "";
        });
    } catch (error) {
        console.error(error, "Erro ao consultar o CEP.");

        clearAddressFields();
    }
}

/**
 * Inicializa o preenchimento automático de endereço via ViaCEP para todos os
 * campos CEP do conjunto presentes no elemento raiz.
 *
 * Registra o evento `change` em cada campo com a classe `fb-field-cep`,
 * disparando a consulta ao ViaCEP ao sair do campo com um CEP válido.
 *
 * @param {HTMLElement} root - Elemento raiz que contém os campos renderizados.
 * @returns {void}
 */
export function initCepAutoFill(root) {
    const cepFields = root.querySelectorAll(`.${CUSTOM_FIELD_TYPE.cep.class}`);

    if (!cepFields.length) return;

    cepFields.forEach((cepInput) => cepInput.addEventListener("change", () => fetchCepFromViaCep(cepInput)));
}

// #endregion

// #region Painel de edição do formBuilder

/**
 * Registra o comportamento de validação de um campo de limite (mín. ou máx.) do checkbox-group.
 *
 * - Permite apenas dígitos.
 * - Garante que o valor fique entre 1 e o total de opções.
 * - Sincroniza os campos min/max para evitar inconsistências.
 *
 * @param {HTMLInputElement} input - Campo de limite a ser registrado.
 * @param {HTMLInputElement} maxInput - Campo de máximo selecionável.
 * @param {HTMLInputElement} minInput - Campo de mínimo selecionável.
 * @param {() => number} getTotalOptions - Função que retorna o total de opções do grupo.
 * @returns {void}
 */
function registerLimitInput(input, maxInput, minInput, getTotalOptions) {
    input.addEventListener("input", (e) => {
        const target = e.target;

        target.value = target.value.replace(/\D/g, "");

        const total = getTotalOptions();
        const isMax = target.classList.contains("fb-field-checkbox--max-selected");
        const isMin = target.classList.contains("fb-field-checkbox--min-selected");

        if (target.value === "" || parseInt(target.value) === 0) target.value = 1;
        else if (parseInt(target.value) > total) target.value = total;

        const currentMax = parseInt(maxInput.value);
        const currentMin = parseInt(minInput.value);

        if (isMin && currentMin > currentMax) maxInput.value = currentMin;
        if (isMax && currentMax < currentMin) minInput.value = currentMax;
    });
}

/**
 * Registra o comportamento do botão de adição de opções do checkbox-group.
 *
 * - Ao adicionar uma opção, atualiza `maxInput` para o novo total e reseta `minInput` para 1.
 * - Ao remover uma opção, ajusta ambos os campos para não ultrapassar o novo total.
 *
 * @param {HTMLElement} addOptionBtn - Botão de adição de opções.
 * @param {HTMLInputElement} maxInput - Campo de máximo selecionável.
 * @param {HTMLInputElement} minInput - Campo de mínimo selecionável.
 * @param {string} panelId - ID do painel de edição do campo.
 * @returns {void}
 */
function registerAddOptionButton(addOptionBtn, maxInput, minInput, panelId) {
    const EVENT_BIND_DELAY = 500;

    addOptionBtn.addEventListener("click", () => {
        setTimeout(() => {
            document.querySelectorAll(`#${panelId} .formbuilder-icon-cancel`).forEach((btn) => {
                const isRemovable = btn.style.display !== "none";

                if (isRemovable) {
                    btn.addEventListener("click", () => {
                        const total =
                            document.querySelectorAll(`#${panelId} .sortable-options-wrap .option-selected`).length - 1;

                        if (parseInt(maxInput.value) > total) maxInput.value = total;
                        if (parseInt(minInput.value) > total) minInput.value = total;
                    });
                }
            });
        }, EVENT_BIND_DELAY);

        const total = document.querySelectorAll(`#${panelId} .formbuilder-icon-cancel`).length + 1;

        maxInput.value = total;
        minInput.value = 1;
    });
}

/**
 * Inicializa os controles de limite mínimo e máximo de seleção no painel de edição
 * de um campo `checkbox-group` do formBuilder.
 *
 * - Define o valor inicial de `maxInput` como o total de opções existentes.
 * - Registra validação e sincronização entre os campos min/max.
 * - Registra o comportamento do botão de adição/remoção de opções.
 *
 * @param {HTMLElement} editPanel - Painel de edição do campo gerado pelo formBuilder.
 * @returns {void}
 */
export function initCheckboxGroupSelectionLimits(editPanel) {
    const isCheckboxGroupField = document
        .querySelector(`#${editPanel.id}`)
        .closest("li")
        .classList.contains("checkbox-group-field");

    if (!isCheckboxGroupField) return;

    const maxInput = document.querySelector(`#${editPanel.id} .fb-field-checkbox--max-selected`);
    const minInput = document.querySelector(`#${editPanel.id} .fb-field-checkbox--min-selected`);
    const addOptionBtn = document.querySelector(`#${editPanel.id} .add.add-opt`);

    if (maxInput.value === "") maxInput.value = 1;
    if (minInput.value === "") minInput.value = 1;

    const getTotalOptions = () =>
        document.querySelectorAll(`#${editPanel.id} .sortable-options-wrap .option-selected`).length;

    maxInput.value = getTotalOptions();

    registerLimitInput(maxInput, maxInput, minInput, getTotalOptions);
    registerLimitInput(minInput, maxInput, minInput, getTotalOptions);
    registerAddOptionButton(addOptionBtn, maxInput, minInput, editPanel.id);
}

// #endregion
