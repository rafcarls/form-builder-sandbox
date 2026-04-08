import { CUSTOM_FIELD_TYPE } from "./constants.js";
import { mapCepFieldGroup, mapCBODatalist, initCBODatalist, initHyperlinkField, initCepAutoFill } from "./fieldMap.js";
import * as mask from "./mask.js";
import * as validation from "./validation.js";

/**
 * Representa o comportamento aplicado a um tipo de campo.
 *
 * @typedef {Object} FieldBehavior
 * @property {(value: string) => string} [mask] - Função responsável por aplicar máscara ao valor do campo.
 * @property {(value: string) => boolean} [validate] - Função responsável por validar o valor do campo.
 */

/**
 * Mapa de comportamentos indexado pela classe CSS do tipo de campo.
 *
 * A chave corresponde à classe CSS aplicada ao campo e o valor define
 * as funções de máscara e validação associadas.
 *
 * @type {Object<string, FieldBehavior>}
 * @private
 */
const fieldBehaviorMap = {
    [CUSTOM_FIELD_TYPE.brl.class]: {
        mask: mask.maskBRL,
        validate: null,
    },
    [CUSTOM_FIELD_TYPE.cep.class]: {
        mask: mask.maskCEP,
        validate: validation.isValidCEP,
    },
    [CUSTOM_FIELD_TYPE.cel.class]: {
        mask: mask.maskCel,
        validate: validation.isValidCel,
    },
    [CUSTOM_FIELD_TYPE.cnh.class]: {
        mask: mask.maskCNH,
        validate: validation.isValidCNH,
    },
    [CUSTOM_FIELD_TYPE.cnj.class]: {
        mask: mask.maskCNJ,
        validate: validation.isValidCNJ,
    },
    [CUSTOM_FIELD_TYPE.cnpj.class]: {
        mask: mask.maskCNPJ,
        validate: validation.isValidCNPJ,
    },
    [CUSTOM_FIELD_TYPE.cno.class]: {
        mask: mask.maskCNO,
        validate: validation.isValidCNO,
    },
    [CUSTOM_FIELD_TYPE.cpf.class]: {
        mask: mask.maskCPF,
        validate: validation.isValidCPF,
    },
    [CUSTOM_FIELD_TYPE.data.class]: {
        mask: mask.maskData,
        validate: validation.isValidData,
    },
    [CUSTOM_FIELD_TYPE.email.class]: {
        mask: null,
        validate: validation.isValidEmail,
    },
    [CUSTOM_FIELD_TYPE.hora.class]: {
        mask: (value) => mask.maskHora(value, true),
        validate: validation.isValidHora,
    },
    [CUSTOM_FIELD_TYPE.iptu.class]: {
        mask: mask.maskIPTU,
        validate: validation.isValidIPTU,
    },
    [CUSTOM_FIELD_TYPE.pis.class]: {
        mask: mask.maskPIS,
        validate: validation.isValidPIS,
    },
    [CUSTOM_FIELD_TYPE.tel.class]: {
        mask: mask.maskTel,
        validate: validation.isValidTel,
    },
};

/**
 * Inicializa o comportamento global dos campos customizados dentro do elemento raiz.
 *
 * Utiliza delegação de eventos para escutar o evento `input` no elemento raiz e,
 * para cada campo que possua uma classe registrada em `fieldBehaviorMap`,
 * executa:
 *
 * 1. **Máscara** — formata o valor do campo via `behavior.mask`, se definida.
 * 2. **Validação** — alterna a classe `is-invalid` conforme o retorno de `behavior.validate`.
 *
 * Além disso, inicializa recursos adicionais necessários para o formulário:
 * - **CBO Datalist** — popula dinamicamente os campos relacionados via `initCBODatalist`.
 * - **Hiperlink** — registra o evento de clique para abertura de URL via `initHyperlinkField`.
 * - **CEP AutoFill** — registra o evento `change` para consulta ao ViaCEP via `initCepAutoFill`.
 *
 * @param {HTMLElement} root - Elemento raiz que envolve os campos do formulário.
 * @returns {Promise<void>}
 */
export async function registerFieldBehavior(root) {
    if (!root) return;

    root.addEventListener("input", (e) => {
        const field = e.target;

        if (!field.classList) return;

        for (const className of field.classList) {
            const behavior = fieldBehaviorMap[className];

            if (!behavior) continue;

            // Máscara
            if (behavior.mask) field.value = behavior.mask(field.value);

            // Validação
            if (behavior.validate) {
                if (field.value.trim() === "") field.classList.remove("is-invalid");
                else field.classList.toggle("is-invalid", !behavior.validate(field.value));
            }

            break;
        }
    });

    initHyperlinkField(root);

    await initCBODatalist(root);

    initCepAutoFill(root);
}

/**
 * Agrega os mapeamentos executados após a adição de um campo no formBuilder.
 *
 * Deve ser associado ao evento `onAddFieldAfter` do formBuilder.
 * Para adicionar novos comportamentos, inclua chamadas nesta função.
 *
 * @param {string} fieldId - ID do campo criado pelo formBuilder.
 * @param {Object} fieldData - Objeto contendo os metadados do campo adicionado pelo formBuilder.
 * @returns {void}
 */
export function onFieldAdded(fieldId, fieldData) {
    mapCBODatalist(fieldId, fieldData);
    mapCepFieldGroup(fieldId, fieldData);
}
