import { DATA_BASE_URL, DEMO_BASE_URL, JSON_FETCH_ERROR } from "./constants.js";

/**
 * Obtém os dados do formulário a partir de um arquivo JSON.
 *
 * @async
 * @returns {Promise<Object[]|null>}
 * - Array de definição de campos compatível com formBuilder/formRender.
 * - `null` em caso de erro na requisição ou parsing.
 */
export async function getFormData() {
    try {
        const res = await fetch(`${DEMO_BASE_URL}formData.json`);

        if (!res.ok) throw new Error(JSON_FETCH_ERROR);

        return await res.json();
    } catch (error) {
        console.error(error);

        return null;
    }
}

/**
 * Carrega os dados do CBO a partir do arquivo JSON.
 *
 * @async
 * @param {Array<{codigo: string, titulo: string}>|null} cboDataCache - Cache atual dos dados do CBO, ou `null` se ainda não carregado.
 * @returns {Promise<Array<{codigo: string, titulo: string}>>} Array de ocupações do CBO.
 * @throws {Error} Se a requisição ao arquivo JSON falhar.
 */
export async function getCBOData(cboDataCache) {
    if (cboDataCache) return cboDataCache;

    const res = await fetch(`${DATA_BASE_URL}cbo.json`);

    if (!res.ok) throw new Error(JSON_FETCH_ERROR);

    cboDataCache = await res.json();

    return cboDataCache;
}

/**
 * Verifica se todos os dígitos de uma string são iguais.
 *
 * A função assume que o valor informado já contém apenas dígitos numéricos.
 *
 * @param {string} value - String composta exclusivamente por dígitos (`0-9`).
 * @returns {boolean} `true` se todos os dígitos forem iguais (ex: "111111"); caso contrário, `false`.
 */
export function hasAllEqualDigits(value) {
    return /^(\d)\1+$/.test(value);
}

/**
 * Remove todos os caracteres não numéricos de uma string.
 *
 * @param {string} value - Valor a ser sanitizado (pode conter qualquer tipo de caractere).
 * @returns {string} String contendo apenas dígitos numéricos (`0-9`).
 */
export function keepOnlyDigits(value) {
    return value.replace(/\D/g, "");
}

/**
 * Limita uma string a um número máximo de caracteres.
 *
 * @param {string} value - String a ser truncada.
 * @param {number} max - Número máximo de caracteres a manter.
 * @returns {string} String limitada a `max` caracteres.
 */
export function truncate(value, max) {
    return value.slice(0, max);
}
