import { keepOnlyDigits, truncate } from "./utils.js";

/**
 * Aplica a máscara de moeda brasileira (BRL) a um valor informado.
 *
 * Remove todos os caracteres não numéricos e formata progressivamente
 * no padrão: `R$ 0.000,00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como moeda brasileira.
 */
export function maskBRL(value) {
    const digits = keepOnlyDigits(value);

    if (!digits) return "";

    const amount = (parseInt(digits, 10) / 100).toFixed(2);

    //return "R$ " + amount.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return amount.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

/**
 * Aplica a máscara de CEP a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 8 dígitos
 * e formata no padrão: `00000-000`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como CEP.
 */
export function maskCEP(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 8);

    return value
        .replace(/\D+/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
}

/**
 * Aplica a máscara de celular a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 11 dígitos
 * e formata no padrão: `(00) 00000-0000`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como celular.
 */
export function maskCel(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 11);

    return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

/**
 * Aplica a máscara de CNH a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 11 dígitos
 * e formata no padrão: `000000000-00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como CNH.
 */
export function maskCNH(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 11);

    return value.replace(/(\d{9})(\d)/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
}

/**
 * Aplica a máscara de certidão de Nascimento, Casamento ou Óbito (padrão CNJ) a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 32 dígitos
 * e formata no padrão: `000000.00.00.0000.0.00000.000.0000000-00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como certidão CNJ.
 */
export function maskCNJ(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 32);

    return value
        .replace(/^(\d{6})(\d)/, "$1.$2")
        .replace(/^(\d{6})\.(\d{2})(\d)/, "$1.$2.$3")
        .replace(/^(\d{6})\.(\d{2})\.(\d{2})(\d)/, "$1.$2.$3.$4")
        .replace(/^(\d{6})\.(\d{2})\.(\d{2})\.(\d{4})(\d)/, "$1.$2.$3.$4.$5")
        .replace(/^(\d{6})\.(\d{2})\.(\d{2})\.(\d{4})\.(\d{1})(\d)/, "$1.$2.$3.$4.$5.$6")
        .replace(/^(\d{6})\.(\d{2})\.(\d{2})\.(\d{4})\.(\d{1})\.(\d{5})(\d)/, "$1.$2.$3.$4.$5.$6.$7")
        .replace(/^(\d{6})\.(\d{2})\.(\d{2})\.(\d{4})\.(\d{1})\.(\d{5})\.(\d{3})(\d)/, "$1.$2.$3.$4.$5.$6.$7.$8")
        .replace(
            /^(\d{6})\.(\d{2})\.(\d{2})\.(\d{4})\.(\d{1})\.(\d{5})\.(\d{3})\.(\d{7})(\d)/,
            "$1.$2.$3.$4.$5.$6.$7.$8-$9",
        );
}

/**
 * Aplica a máscara de CNPJ a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 14 dígitos
 * e formata no padrão: `00.000.000/0000-00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como CNPJ.
 */
export function maskCNPJ(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 14);

    return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

/**
 * Aplica a máscara de CNO (Cadastro Nacional de Obras) a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 12 dígitos
 * e formata no padrão: `00.000.00000/00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como CNO.
 */
export function maskCNO(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 12);

    return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{5})(\d)/, "$1.$2.$3/$4")
        .replace(/(\/\d{2})\d+$/, "$1");
}

/**
 * Aplica a máscara de CPF a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 11 dígitos
 * e formata no padrão: `000.000.000-00`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como CPF.
 */
export function maskCPF(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 11);

    return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Aplica a máscara de data a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 8 dígitos
 * e formata no padrão: `DD/MM/AAAA`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como data.
 */
export function maskData(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 8);

    return value
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1");
}

/**
 * Aplica a máscara de hora a um valor informado.
 *
 * Remove todos os caracteres não numéricos e formata no padrão
 * `HH:MM` ou `HH:MM:SS`, conforme o parâmetro `includeSeconds`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @param {boolean} [includeSeconds=false] - Indica se os segundos devem ser incluídos na máscara.
 * @returns {string} Valor formatado como hora.
 */
export function maskHora(value, includeSeconds = false) {
    const maxDigits = includeSeconds ? 6 : 4;

    value = keepOnlyDigits(value);
    value = truncate(value, maxDigits);

    return value.replace(/(\d{2})(\d)/, "$1:$2").replace(/(\d{2})(\d)/, "$1:$2");
}

/**
 * Aplica a máscara de IPTU a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 16 dígitos
 * e formata no padrão: `9.99.99.999.999.9999`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como IPTU.
 */
export function maskIPTU(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 16);

    return value
        .replace(/^(\d{1})(\d)/, "$1.$2")
        .replace(/^(\d{1})\.(\d{2})(\d)/, "$1.$2.$3")
        .replace(/^(\d{1})\.(\d{2})\.(\d{2})(\d)/, "$1.$2.$3.$4")
        .replace(/^(\d{1})\.(\d{2})\.(\d{2})\.(\d{3})(\d)/, "$1.$2.$3.$4.$5")
        .replace(/^(\d{1})\.(\d{2})\.(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3.$4.$5.$6");
}

/**
 * Aplica a máscara de Inscrição Municipal a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 9 dígitos
 * e formata no padrão: `00000/0000`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como Inscrição Municipal.
 */
export function maskInscricaoMunicipal(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 9);

    return value.replace(/^(\d{5})(\d)/, "$1/$2").replace(/(\/\d{4})\d+$/, "$1");
}

/**
 * Aplica a máscara de PIS/PASEP a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 11 dígitos
 * e formata no padrão: `000.00000.00-0`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como PIS/PASEP.
 */
export function maskPIS(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 11);

    return value
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3-$4");
}

/**
 * Aplica a máscara de telefone fixo a um valor informado.
 *
 * Remove todos os caracteres não numéricos, limita a 10 dígitos
 * e formata no padrão: `(00) 0000-0000`.
 *
 * @param {string} value - Valor informado pelo usuário (com ou sem formatação).
 * @returns {string} Valor formatado como telefone fixo.
 */
export function maskTel(value) {
    value = keepOnlyDigits(value);
    value = truncate(value, 10);

    return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}
