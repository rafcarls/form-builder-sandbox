import { DEFAULT_FIELD_TYPE_LABELS, CUSTOM_FIELD_TYPE, CUSTOM_INPUT_SETS } from "./constants.js";

/**
 * Reordena os itens da barra lateral do formBuilder conforme uma ordem pré-definida.
 *
 * A função localiza o container `.frmb-control` dentro do elemento raiz e,
 * com base na lista `itemLabelOrder`, reposiciona os elementos filhos
 * correspondentes ao final do container, respeitando a sequência definida.
 *
 * A correspondência entre os itens é feita pelo texto exibido (`textContent`).
 *
 * @param {HTMLElement} root - Elemento raiz que contém a instância do formBuilder.
 * @returns {void}
 */
export function reorderSidebarItems(root) {
    const sidebar = root.querySelector(".frmb-control");

    if (!sidebar) return;

    /**
     * Ordem desejada dos itens da barra lateral baseada nos labels exibidos.
     *
     * @type {string[]}
     */
    const itemLabelOrder = [
        // Campos padrão do formBuilder
        DEFAULT_FIELD_TYPE_LABELS.text,
        DEFAULT_FIELD_TYPE_LABELS.number,
        DEFAULT_FIELD_TYPE_LABELS.textarea,
        DEFAULT_FIELD_TYPE_LABELS.select,
        DEFAULT_FIELD_TYPE_LABELS.radio,
        DEFAULT_FIELD_TYPE_LABELS.checkbox,
        DEFAULT_FIELD_TYPE_LABELS.autocomplete,
        DEFAULT_FIELD_TYPE_LABELS.date,
        DEFAULT_FIELD_TYPE_LABELS.file,
        DEFAULT_FIELD_TYPE_LABELS.hidden,
        DEFAULT_FIELD_TYPE_LABELS.button,
        DEFAULT_FIELD_TYPE_LABELS.header,
        DEFAULT_FIELD_TYPE_LABELS.paragraph,

        // Campos customizados
        CUSTOM_FIELD_TYPE.cpf.label,
        CUSTOM_FIELD_TYPE.cnh.label,
        CUSTOM_FIELD_TYPE.pis.label,
        CUSTOM_FIELD_TYPE.cnpj.label,
        CUSTOM_FIELD_TYPE.cno.label,
        CUSTOM_FIELD_TYPE.cnj.label,
        CUSTOM_FIELD_TYPE.tel.label,
        CUSTOM_FIELD_TYPE.cel.label,
        CUSTOM_FIELD_TYPE.email.label,
        CUSTOM_FIELD_TYPE.cep.label,
        CUSTOM_FIELD_TYPE.data.label,
        CUSTOM_FIELD_TYPE.hora.label,
        CUSTOM_FIELD_TYPE.brl.label,
        CUSTOM_FIELD_TYPE.iptu.label,
        CUSTOM_FIELD_TYPE.cbo.label,
        CUSTOM_FIELD_TYPE.hiperlink.label,

        // Conjuntos de campos customizados
        CUSTOM_INPUT_SETS.cep.label,
    ];

    itemLabelOrder.forEach((label) => {
        const control = Array.from(sidebar.children).find((el) => el.textContent.includes(label));

        if (control) sidebar.appendChild(control);
    });
}

/**
 * Cria um `<datalist>` e o insere no final do `<body>`, caso ainda não exista.
 *
 * @async
 * @param {string} id - ID do datalist a ser criado.
 * @param {() => Promise<Array<{value: string, label: string}>>} fetchFn - Função que retorna os dados do datalist.
 * @returns {Promise<void>}
 */
export async function createDatalist(id, fetchFn) {
    if (document.getElementById(id)) return;

    const data = await fetchFn();

    const datalist = document.createElement("datalist");

    datalist.id = id;

    datalist.innerHTML = data
        .map(({ value, label }) => `<option value="${label}" data-id="${value}"></option>`)
        .join("");

    document.body.appendChild(datalist);
}

/**
 * Vincula um elemento input a um datalist via atributo `list`.
 *
 * @param {Element} input - Elemento input a ser vinculado.
 * @param {string} id - ID do datalist ao qual o input será vinculado.
 * @returns {void}
 */
export function bindDatalist(input, id) {
    input.setAttribute("list", id);
}
