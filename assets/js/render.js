import * as config from "./config.js";
import { registerFieldBehavior } from "./helpers/fieldBehavior.js";

// Necessário apenas para a Opção 1 (carregamento via arquivo JSON)
import { getFormData } from "./helpers/utils.js";

/**
 * Elemento raiz onde o formulário será renderizado.
 *
 * @type {HTMLElement|null}
 */
const root = document.getElementById("fb-render-root");

/**
 * Registra eventos de ações do formRender.
 *
 * @param {Object} formRender - Instância do formRender.
 * @returns {void}
 */
function registerFormRenderActions(formRender) {
    const renderForm = document.getElementById("fb-render-form");
    const clearBtn = document.getElementById("fb-btn-clear");

    clearBtn.addEventListener("click", () => {
        document.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    });

    renderForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const userData = formRender.userData;

        const isFormEmpty = userData.length <= 0;

        if (isFormEmpty) return;

        normalizeFormData(userData);

        const formData = JSON.stringify(userData);

        console.info(formData);

        // TODO: Implementar requisição POST via fetch para persistir os dados no backend
    });
}

/**
 * Normaliza o `userData` dos campos do formulário.
 * (Aplica ajustes que não são realizados automaticamente pelo formRender)
 *
 * - Para campos preenchíveis (`text`, `number`, `textarea`, `date`),
 *   atualiza a propriedade `value` com base no primeiro valor presente em `field.userData`.
 *
 * - Para campos selecionáveis (`autocomplete`, `radio-group`, `select`, `checkbox-group`),
 *   sincroniza a propriedade `selected` de cada opção em `values` conforme os valores
 *   presentes em `field.userData`.
 *
 * @param {Object[]} userData - Array de campos retornado por `formRender.userData`.
 * @returns {void}
 */
function normalizeFormData(userData) {
    if (userData.length <= 0) return;

    userData.forEach((field) => {
        switch (field.type) {
            case "text":
            case "number":
            case "textarea":
            case "date":
                //case "file":
                field.value = field.userData[0];
                break;

            case "autocomplete":
            case "radio-group":
            case "select":
            case "checkbox-group":
                field.values.forEach((option) => (option.selected = field.userData.includes(option.value)));
                break;

            default:
                break;
        }
    });
}

/**
 * Inicializa o formRender e aplica customizações adicionais.
 *
 * 1. Obtém o `formData` a partir do `localStorage` ou de um arquivo JSON externo.
 * 2. Instancia o formRender com as configurações definidas.
 * 3. Aplica comportamentos globais (máscaras e validações).
 *
 * @async
 * @returns {Promise<void>}
 */
async function initFormRender() {
    if (!root) return;

    try {
        // Opção 1: carrega o formData a partir do arquivo de demonstração (assets/demo/formData.json)
        const formData = await getFormData();

        // Opção 2: carrega o formData a partir do localStorage
        // O builder persiste os dados em "formBuilderData" via botão salvar
        //const formData = localStorage.getItem("formBuilderData");

        /**
         * Configurações de inicialização do formRender.
         *
         * @type {Object}
         */
        const options = {
            i18n: config.i18n,
            formData: formData || null,
        };

        const formRender = $(root).formRender(options);

        console.info("formRender inicializado:", formRender);

        registerFormRenderActions(formRender);
        registerFieldBehavior(root);
    } catch (error) {
        console.error("Erro ao inicializar o FormRender:", error);
    }
}

initFormRender();
