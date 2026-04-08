/**
 * Labels padrão dos tipos de campos do formBuilder.
 *
 * @type {Record<string, string>}
 */
export const DEFAULT_FIELD_TYPE_LABELS = {
    autocomplete: "Campo com Sugestões",
    button: "Botão",
    checkbox: "Caixas de Seleção",
    date: "Campo de Data",
    file: "Campo de Arquivo",
    header: "Cabeçalho",
    hidden: "Campo Oculto",
    number: "Campo Numérico",
    paragraph: "Parágrafo",
    radio: "Seleção Única",
    select: "Campo de Seleção",
    text: "Campo de Texto",
    textarea: "Área de Texto",
};

/**
 * Valores padrão para campos que possuem opções.
 *
 * @type {{ label: string, value: string }[]}
 */
export const DEFAULT_FIELD_OPTIONS_VALUES = [
    { label: "Opção 1", value: "1" },
    { label: "Opção 2", value: "2" },
    { label: "Opção 3", value: "3" },
];

/**
 * Tipos de campos customizados.
 *
 * @type {Record<string, { label: string, class: string, icon: string }>}
 */
export const CUSTOM_FIELD_TYPE = {
    // Identificação pessoal
    cpf: {
        label: "CPF",
        class: "fb-field-cpf",
        icon: '<i class="bi bi-person-vcard"></i>',
    },
    cnh: {
        label: "CNH",
        class: "fb-field-cnh",
        icon: '<i class="bi bi-car-front"></i>',
    },
    pis: {
        label: "PIS/PASEP",
        class: "fb-field-pis",
        icon: '<i class="bi bi-person-badge"></i>',
    },
    // Identificação jurídica
    cnpj: {
        label: "CNPJ",
        class: "fb-field-cnpj",
        icon: '<i class="bi bi-credit-card-2-front"></i>',
    },
    cno: {
        label: "CNO",
        class: "fb-field-cno",
        icon: '<i class="bi bi-briefcase"></i>',
    },
    cnj: {
        label: "CNJ",
        class: "fb-field-cnj",
        icon: '<i class="bi bi-file-ruled"></i>',
    },
    // Contato
    tel: {
        label: "Telefone",
        class: "fb-field-tel",
        icon: '<i class="bi bi-telephone"></i>',
    },
    cel: {
        label: "Celular",
        class: "fb-field-cel",
        icon: '<i class="bi bi-phone"></i>',
    },
    email: {
        label: "E-mail",
        class: "fb-field-email",
        icon: '<i class="bi bi-envelope"></i>',
    },
    // Endereço
    cep: {
        label: "CEP",
        class: "fb-field-cep",
        icon: '<i class="bi bi-pin-map-fill"></i>',
    },
    // Data e hora
    data: {
        label: "Data",
        class: "fb-field-data",
        icon: '<i class="bi bi-calendar"></i>',
    },
    hora: {
        label: "Hora",
        class: "fb-field-hora",
        icon: '<i class="bi bi-alarm"></i>',
    },
    // Financeiro
    brl: {
        label: "BRL",
        class: "fb-field-brl",
        icon: '<i class="bi bi-cash"></i>',
    },
    iptu: {
        label: "IPTU",
        class: "fb-field-iptu",
        icon: '<i class="bi bi-house"></i>',
    },
    // Ocupação
    cbo: {
        label: "CBO",
        class: "fb-field-cbo",
        icon: '<i class="bi bi-briefcase"></i>',
    },
    // Misc
    hiperlink: {
        label: "Hiperlink",
        class: "fb-field-hiperlink",
        icon: '<i class="bi bi-link"></i>',
    },
};

/**
 * Tipos de conjuntos de campos customizados (Input Sets).
 *
 * Cada entrada define o label e a classe CSS base aplicada
 * aos campos que compõem o conjunto.
 *
 * @type {Record<string, { label: string, class: string, icon: string }>}
 */
export const CUSTOM_INPUT_SETS = {
    cep: {
        label: "Conjunto de CEP",
        class: "fb-input-set-cep",
        icon: '<i class="bi bi-map"></i>',
    },
};

/**
 * ID fixo do datalist do CBO.
 *
 * @type {string}
 */
export const CBO_DATALIST_ID = "fb-datalist-cbo";

/**
 * Caminho base para os arquivos de dados estáticos do projeto.
 *
 * @type {string}
 */
export const DATA_BASE_URL = "../assets/data/";

/**
 * Caminho base para os arquivos de demonstração do projeto.
 *
 * @type {string}
 */
export const DEMO_BASE_URL = "../assets/demo/";

/**
 * Mensagem de erro padrão para falhas em requisições JSON.
 *
 * @type {string}
 */
export const JSON_FETCH_ERROR = "Falha ao obter arquivo JSON!";
