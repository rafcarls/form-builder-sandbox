import * as config from "./config.js";
import { reorderSidebarItems } from "./helpers/dom.js";
import { onFieldAdded, registerFieldBehavior } from "./helpers/fieldBehavior.js";
import { getFormData } from "./helpers/utils.js";

/**
 * Elemento raiz onde o formulário será renderizado.
 *
 * @type {HTMLElement|null}
 */
const root = document.getElementById("fb-builder-root");

/**
 * Pré-carrega dados no formBuilder a partir de uma fonte externa (ex: arquivo JSON).
 *
 * Utiliza a action `setData` para popular o formulário com uma estrutura previamente definida,
 * sendo especialmente útil em cenários de edição.
 *
 * @async
 * @param {Object} formBuilder - Instância do formBuilder.
 * @returns {Promise<void>}
 */
async function preloadFormBuilderData(formBuilder) {
    const { setData } = formBuilder.actions;

    setData(await getFormData());
}

/**
 * Registra eventos de ações do formBuilder.
 *
 * @async
 * @param {Object} formBuilder - Instância do formBuilder.
 * @param {boolean} [formattedJson=true] - Indica se o JSON deve ser formatado.
 * @returns {void}
 */
async function registerFormBuilderActions(formBuilder, formattedJson = true) {
    const jsBtn = document.getElementById("fb-btn-export-js");
    const jsonBtn = document.getElementById("fb-btn-export-json");
    const xmlBtn = document.getElementById("fb-btn-export-xml");
    const clearBtn = document.getElementById("fb-btn-clear");
    const saveBtn = document.getElementById("fb-btn-save");

    const { getData, clearFields } = formBuilder.actions;

    jsBtn?.addEventListener("click", () => console.info(getData()));
    jsonBtn?.addEventListener("click", () => console.info(getData("json", formattedJson)));
    xmlBtn?.addEventListener("click", () => console.info(getData("xml")));
    clearBtn?.addEventListener("click", () => clearFields());

    saveBtn?.addEventListener("click", () => {
        const formData = getData();

        // Persiste o formData no localStorage para ser consumido pelo render.js (Opção 2).
        localStorage.setItem("formBuilderData", resetFormDataValues(formData));

        console.info("Formulário salvo com sucesso!");

        // TODO: Implementar requisição POST via fetch para persistir os dados no backend.
    });
}

/**
 * Reseta os valores dos campos do formulário para o estado padrão do formBuilder
 * e retorna os dados serializados em JSON.
 *
 * - Para campos preenchíveis (`text`, `number`, `textarea`, `date`, `file`),
 *   redefine a propriedade `value` para uma string vazia.
 *
 * - Para campos selecionáveis (`autocomplete`, `radio-group`, `select`, `checkbox-group`),
 *   redefine a propriedade `selected` de todas as opções para `false`.
 *
 * @param {Object[]} formData - Array de campos gerado pelo formBuilder.
 * @returns {string|undefined} String JSON com os dados normalizados ou `undefined`
 * caso o array esteja vazio.
 */
function resetFormDataValues(formData) {
    if (formData.length <= 0) return;

    formData.forEach((field) => {
        switch (field.type) {
            case "date":
            case "file":
            case "number":
            case "text":
            case "textarea":
                field.value = "";
                break;

            case "autocomplete":
            case "checkbox-group":
            case "radio-group":
            case "select":
                field.values.forEach((option) => (option.selected = false));
                break;

            default:
                break;
        }
    });

    return JSON.stringify(formData);
}

/**
 * Inicializa o formBuilder e aplica customizações adicionais.
 *
 * 1. Instancia o formBuilder.
 * 2. Reordena os itens da sidebar.
 * 3. Registra comportamentos globais.
 *
 * @async
 * @returns {Promise<void>}
 */
async function initFormBuilder() {
    if (!root) return;

    try {
        /**
         * Configurações de inicialização do formBuilder.
         *
         * @type {Object}
         */
        const options = {
            i18n: config.i18n,
            actionButtons: config.actionButtons,
            controlPosition: config.controlPosition,
            scrollToFieldOnAdd: config.scrollToFieldOnAdd,
            replaceFields: config.replaceFields,
            fields: config.fields,
            inputSets: config.inputSets,
            onAddFieldAfter: onFieldAdded,
        };

        const formBuilder = await $(root).formBuilder(options).promise;

        console.info("formBuilder inicializado:", formBuilder);

        registerFormBuilderActions(formBuilder, false);
        registerFieldBehavior(root);
        reorderSidebarItems(root);
        //await preloadFormBuilderData(formBuilder);
    } catch (error) {
        console.error("Erro ao inicializar o FormBuilder:", error);
    }
}

initFormBuilder();
