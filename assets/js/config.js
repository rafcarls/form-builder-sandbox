import {
    DEFAULT_FIELD_TYPE_LABELS,
    DEFAULT_FIELD_OPTIONS_VALUES,
    CUSTOM_FIELD_TYPE,
    CUSTOM_INPUT_SETS,
} from "./helpers/constants.js";

/**
 * Estrutura de um botão de ação do formBuilder.
 *
 * @typedef {Object} ActionButton
 * @property {string} id - Identificador único do botão.
 * @property {string} className - Classes CSS aplicadas ao botão.
 * @property {string} label - Texto ou emoji exibido no botão.
 * @property {"button"|"submit"|"reset"} type - Tipo do elemento button.
 * @property {Object} events - Mapa de eventos do botão.
 * @property {Function} events.click - Handler executado ao clicar no botão.
 */

/**
 * Botões de ação exibidos na barra de ferramentas do formBuilder.
 *
 * @type {ActionButton[]}
 */
export const actionButtons = [
    {
        id: "smile",
        className: "btn btn-success",
        label: "😁",
        type: "button",
        events: {
            click: function () {
                alert("😁");
            },
        },
    },
];

/**
 * Define a ordem dos itens na barra lateral do formBuilder.
 *
 * Se vazio, o formBuilder utilizará a ordem padrão.
 *
 * @type {string[]}
 */
export const controlOrder = [];

/**
 * Define a posição da barra lateral dos itens do formBuilder.
 *
 * @type {"left" | "right"}
 */
export const controlPosition = "left";

/**
 * Lista de tipos de campos a serem desabilitados no formBuilder.
 *
 * @type {string[]}
 */
export const disableFields = [];

/**
 * Configurações de internacionalização do formBuilder.
 *
 * @type {{ locale: string, location: string }}
 */
export const i18n = {
    locale: "pt-BR",
    location: "../node_modules/formbuilder-languages/",
};

/**
 * Estrutura base de um campo do formBuilder.
 *
 * @typedef {Object} FormBuilderField
 * @property {string} type
 * @property {string} label
 * @property {string} className
 * @property {string} [icon]
 * @property {{ label: string, value: string }[]} [values]
 */

/**
 * Substituições dos campos padrão do formBuilder.
 *
 * @type {FormBuilderField[]}
 */
export const replaceFields = [
    {
        type: "autocomplete",
        label: DEFAULT_FIELD_TYPE_LABELS.autocomplete,
        className: "form-control fb-field-autocomplete",
        values: DEFAULT_FIELD_OPTIONS_VALUES,
    },
    {
        type: "button",
        label: DEFAULT_FIELD_TYPE_LABELS.button,
        className: "btn btn-primary fb-field-button",
    },
    {
        type: "checkbox-group",
        label: DEFAULT_FIELD_TYPE_LABELS.checkbox,
        className: "fb-field-checkbox",
        values: DEFAULT_FIELD_OPTIONS_VALUES,
    },
    {
        type: "date",
        label: DEFAULT_FIELD_TYPE_LABELS.date,
        className: "form-control fb-field-date",
    },
    {
        type: "file",
        label: DEFAULT_FIELD_TYPE_LABELS.file,
        className: "form-control fb-field-file",
    },
    {
        type: "header",
        label: DEFAULT_FIELD_TYPE_LABELS.header,
        className: "fb-field-header",
    },
    {
        type: "hidden",
        label: DEFAULT_FIELD_TYPE_LABELS.hidden,
        className: "fb-field-hidden",
    },
    {
        type: "number",
        label: DEFAULT_FIELD_TYPE_LABELS.number,
        className: "form-control fb-field-number",
    },
    {
        type: "paragraph",
        label: DEFAULT_FIELD_TYPE_LABELS.paragraph,
        className: "fb-field-paragraph",
    },
    {
        type: "radio-group",
        label: DEFAULT_FIELD_TYPE_LABELS.radio,
        className: "fb-field-radio",
        values: DEFAULT_FIELD_OPTIONS_VALUES,
    },
    {
        type: "select",
        label: DEFAULT_FIELD_TYPE_LABELS.select,
        className: "form-control fb-field-select",
        values: DEFAULT_FIELD_OPTIONS_VALUES,
    },
    {
        type: "text",
        label: DEFAULT_FIELD_TYPE_LABELS.text,
        className: "form-control fb-field-text",
    },
    {
        type: "textarea",
        label: DEFAULT_FIELD_TYPE_LABELS.textarea,
        className: "form-control fb-field-textarea",
    },
];

/**
 * Define se o formulário deve rolar automaticamente até o campo recém-adicionado.
 *
 * @type {boolean}
 */
export const scrollToFieldOnAdd = true;

/**
 * Campos customizados adicionais disponíveis no formBuilder.
 *
 * @type {FormBuilderField[]}
 */
export const fields = [
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cpf.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cpf.class}`,
        icon: CUSTOM_FIELD_TYPE.cpf.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cnpj.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cnpj.class}`,
        icon: CUSTOM_FIELD_TYPE.cnpj.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cep.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cep.class}`,
        icon: CUSTOM_FIELD_TYPE.cep.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.data.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.data.class}`,
        icon: CUSTOM_FIELD_TYPE.data.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.hora.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.hora.class}`,
        icon: CUSTOM_FIELD_TYPE.hora.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.tel.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.tel.class}`,
        icon: CUSTOM_FIELD_TYPE.tel.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cel.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cel.class}`,
        icon: CUSTOM_FIELD_TYPE.cel.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.brl.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.brl.class}`,
        icon: CUSTOM_FIELD_TYPE.brl.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.email.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.email.class}`,
        icon: CUSTOM_FIELD_TYPE.email.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cnj.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cnj.class}`,
        icon: CUSTOM_FIELD_TYPE.cnj.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cnh.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cnh.class}`,
        icon: CUSTOM_FIELD_TYPE.cnh.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.iptu.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.iptu.class}`,
        icon: CUSTOM_FIELD_TYPE.iptu.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cno.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cno.class}`,
        icon: CUSTOM_FIELD_TYPE.cno.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.pis.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.pis.class}`,
        icon: CUSTOM_FIELD_TYPE.pis.icon,
    },
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.cbo.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.cbo.class}`,
        icon: CUSTOM_FIELD_TYPE.cbo.icon,
    },
    {
        type: "header",
        subtype: "h6",
        label: CUSTOM_FIELD_TYPE.hiperlink.label,
        className: `${CUSTOM_FIELD_TYPE.hiperlink.class}`,
        icon: CUSTOM_FIELD_TYPE.hiperlink.icon,
    },
];

/**
 * Estrutura de um Input Set do formBuilder.
 *
 * @typedef {Object} InputSet
 * @property {string} label - Label exibido na sidebar do formBuilder.
 * @property {string} icon - Ícone HTML exibido ao lado do label.
 * @property {InputSetField[]} fields - Campos que compõem o conjunto.
 */

/**
 * Estrutura de um campo dentro de um Input Set.
 *
 * @typedef {Object} InputSetField
 * @property {string} type - Tipo do campo (ex: "text", "select").
 * @property {string} label - Label exibido no campo.
 * @property {string} className - Classes CSS aplicadas ao campo.
 * @property {{ label: string, value: string }[]} [values] - Opções disponíveis (para campos do tipo select).
 */

/**
 * Conjuntos de campos personalizados (Input Sets) do formBuilder.
 *
 * Cada entrada representa um grupo de campos pré-configurados
 * que pode ser inserido no formulário como um bloco.
 *
 * @type {InputSet[]}
 */
export const inputSets = [
    {
        label: CUSTOM_INPUT_SETS.cep.label,
        icon: CUSTOM_INPUT_SETS.cep.icon,
        fields: [
            {
                type: "text",
                label: "CEP",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-cep`,
            },
            {
                type: "text",
                label: "Logradouro",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-logradouro`,
            },
            {
                type: "text",
                label: "Número",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-numero`,
            },
            {
                type: "text",
                label: "Bairro",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-bairro`,
            },
            {
                type: "text",
                label: "Cidade",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-localidade`,
            },
            {
                type: "select",
                label: "UF",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-uf`,
                values: [
                    { label: "Selecione", value: "-1" },
                    { label: "AC", value: "AC" },
                    { label: "AL", value: "AL" },
                    { label: "AP", value: "AP" },
                    { label: "AM", value: "AM" },
                    { label: "BA", value: "BA" },
                    { label: "CE", value: "CE" },
                    { label: "DF", value: "DF" },
                    { label: "ES", value: "ES" },
                    { label: "GO", value: "GO" },
                    { label: "MA", value: "MA" },
                    { label: "MT", value: "MT" },
                    { label: "MS", value: "MS" },
                    { label: "MG", value: "MG" },
                    { label: "PA", value: "PA" },
                    { label: "PB", value: "PB" },
                    { label: "PR", value: "PR" },
                    { label: "PE", value: "PE" },
                    { label: "PI", value: "PI" },
                    { label: "RJ", value: "RJ" },
                    { label: "RN", value: "RN" },
                    { label: "RS", value: "RS" },
                    { label: "RO", value: "RO" },
                    { label: "RR", value: "RR" },
                    { label: "SC", value: "SC" },
                    { label: "SP", value: "SP" },
                    { label: "SE", value: "SE" },
                    { label: "TO", value: "TO" },
                ],
            },
            {
                type: "text",
                label: "Complemento",
                className: `form-control ${CUSTOM_INPUT_SETS.cep.class} fb-field-complemento`,
            },
        ],
    },
];
