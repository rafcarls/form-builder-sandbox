import { keepOnlyDigits, hasAllEqualDigits } from "./utils.js";

/**
 * Valida um CEP.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (8 dígitos)
 * - Sequências inválidas (ex: "00000000")
 *
 * @param {string} cep - Valor do CEP com ou sem formatação.
 * @returns {boolean} `true` se o CEP for válido; caso contrário, `false`.
 */
export function isValidCEP(cep) {
    const digits = keepOnlyDigits(cep);

    if (digits.length !== 8) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um número de celular com DDD.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (11 dígitos)
 * - Sequências inválidas (ex: "00000000000")
 *
 * @param {string} cel - Valor do celular com ou sem formatação.
 * @returns {boolean} `true` se o celular for válido; caso contrário, `false`.
 */
export function isValidCel(cel) {
    const digits = keepOnlyDigits(cel);

    if (digits.length !== 11) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um número de CNH.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (11 dígitos)
 * - Sequências inválidas (ex: "11111111111")
 * - Dígitos verificadores (DV)
 *
 * @param {string} cnh - Valor da CNH com ou sem formatação.
 * @returns {boolean} `true` se a CNH for válida; caso contrário, `false`.
 */
export function isValidCNH(cnh) {
    const digits = keepOnlyDigits(cnh);

    if (digits.length !== 11) return false;
    if (hasAllEqualDigits(digits)) return false;

    let sum1 = 0;

    for (let i = 0, j = 9; i < 9; ++i, --j) sum1 += parseInt(digits.charAt(i)) * j;

    let firstCheckDigit = sum1 % 11;

    if (firstCheckDigit >= 10) firstCheckDigit = 0;

    let sum2 = 0;

    for (let i = 0, j = 1; i < 9; ++i, ++j) sum2 += parseInt(digits.charAt(i)) * j;

    let secondCheckDigit = sum2 % 11;

    if (secondCheckDigit >= 10) secondCheckDigit = 0;

    if (parseInt(digits.charAt(9)) !== firstCheckDigit || parseInt(digits.charAt(10)) !== secondCheckDigit)
        return false;

    return true;
}

/**
 * Valida um número de certidão de Nascimento, Casamento ou Óbito (padrão CNJ).
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (32 dígitos)
 * - Sequências inválidas (ex: "00000000000000000000000000000000")
 *
 * @param {string} cnj - Valor da certidão com ou sem formatação.
 * @returns {boolean} `true` se a certidão for válida; caso contrário, `false`.
 */
export function isValidCNJ(cnj) {
    const digits = keepOnlyDigits(cnj);

    if (digits.length !== 32) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um CNPJ.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (14 dígitos)
 * - Sequências inválidas (ex: "00000000000000")
 * - Dígitos verificadores (DV)
 *
 * @param {string} cnpj - Valor do CNPJ com ou sem formatação.
 * @returns {boolean} `true` se o CNPJ for válido; caso contrário, `false`.
 */
export function isValidCNPJ(cnpj) {
    const digits = keepOnlyDigits(cnpj);

    if (digits.length !== 14) return false;
    if (hasAllEqualDigits(digits)) return false;

    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;

    for (let i = 0; i < 12; i++) sum += parseInt(digits[i], 10) * weights[i + 1];

    const firstCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (parseInt(digits[12], 10) !== firstCheckDigit) return false;

    sum = 0;

    for (let i = 0; i < 13; i++) sum += parseInt(digits[i], 10) * weights[i];

    const secondCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (parseInt(digits[13], 10) !== secondCheckDigit) return false;

    return true;
}

/**
 * Valida um número de CNO.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (12 dígitos)
 * - Sequências inválidas (ex: "000000000000")
 *
 * @param {string} cno - Valor do CNO com ou sem formatação.
 * @returns {boolean} `true` se o CNO for válido; caso contrário, `false`.
 */
export function isValidCNO(cno) {
    const digits = keepOnlyDigits(cno);

    if (digits.length !== 12) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um CPF.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (11 dígitos)
 * - Sequências inválidas (ex: "11111111111")
 * - Dígitos verificadores (DV)
 *
 * @param {string} cpf - Valor do CPF com ou sem formatação.
 * @returns {boolean} `true` se o CPF for válido; caso contrário, `false`.
 */
export function isValidCPF(cpf) {
    const digits = keepOnlyDigits(cpf);

    if (digits.length !== 11) return false;
    if (hasAllEqualDigits(digits)) return false;

    let sum = 0;

    for (let i = 0; i < 9; i++) sum += parseInt(digits.charAt(i), 10) * (10 - i);

    let remainder = sum % 11;

    const firstCheckDigit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(digits.charAt(9), 10) !== firstCheckDigit) return false;

    sum = 0;

    for (let i = 0; i < 10; i++) sum += parseInt(digits.charAt(i), 10) * (11 - i);

    remainder = sum % 11;

    const secondCheckDigit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(digits.charAt(10), 10) !== secondCheckDigit) return false;

    return true;
}

/**
 * Valida uma data no formato `DD/MM/AAAA` ou `DD-MM-AAAA`.
 *
 * Remove caracteres não numéricos e verifica:
 * - Formato válido (`DD/MM/AAAA` ou `DD-MM-AAAA`)
 * - Dia válido para o mês informado
 * - Ano bissexto (para fevereiro)
 *
 * @param {string} data - Valor da data com ou sem formatação.
 * @returns {boolean} `true` se a data for válida; caso contrário, `false`.
 */
export function isValidData(data) {
    if (!data.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)) return false;

    const [day, month, year] = data.split(/[\-\/]/).map(Number);

    const maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month !== 2 && day > maxDaysPerMonth[month - 1]) return false;

    if (month === 2) {
        const isLeapYear = (!(year % 4) && year % 100) || !(year % 400);
        if ((!isLeapYear && day >= 29) || (isLeapYear && day > 29)) return false;
    }

    return true;
}

/**
 * Valida um endereço de e-mail.
 *
 * Verifica:
 * - Presença de `@` separando usuário e domínio
 * - Domínio sem pontos consecutivos
 * - TLD com no mínimo 2 caracteres
 *
 * @param {string} email - Endereço de e-mail a ser validado.
 * @returns {boolean} `true` se o e-mail for válido; caso contrário, `false`.
 */
export function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
        email,
    );
}

/**
 * Valida uma hora no formato `HH:MM` ou `HH:MM:SS`.
 *
 * Verifica:
 * - Formato válido (`HH:MM` ou `HH:MM:SS`)
 * - Hora entre `00` e `23`
 * - Minutos e segundos entre `00` e `59`
 *
 * @param {string} hora - Valor da hora com ou sem segundos.
 * @returns {boolean} `true` se a hora for válida; caso contrário, `false`.
 */
export function isValidHora(hora) {
    return /^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(hora);
}

/**
 * Valida um número de IPTU.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (16 dígitos)
 * - Sequências inválidas (ex: "1111111111111111")
 *
 * @param {string} iptu - Valor do IPTU com ou sem formatação.
 * @returns {boolean} `true` se o IPTU for válido; caso contrário, `false`.
 */
export function isValidIPTU(iptu) {
    const digits = keepOnlyDigits(iptu);

    if (digits.length !== 16) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um número de PIS/PASEP.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (11 dígitos)
 * - Sequências inválidas (ex: "00000000000")
 *
 * @param {string} pis - Valor do PIS/PASEP com ou sem formatação.
 * @returns {boolean} `true` se o PIS/PASEP for válido; caso contrário, `false`.
 */
export function isValidPIS(pis) {
    const digits = keepOnlyDigits(pis);

    if (digits.length !== 11) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida um telefone fixo com DDD.
 *
 * Remove caracteres não numéricos e verifica:
 * - Tamanho válido (10 dígitos)
 * - Sequências inválidas (ex: "0000000000")
 *
 * @param {string} tel - Valor do telefone com ou sem formatação.
 * @returns {boolean} `true` se o telefone for válido; caso contrário, `false`.
 */
export function isValidTel(tel) {
    const digits = keepOnlyDigits(tel);

    if (digits.length !== 10) return false;
    if (hasAllEqualDigits(digits)) return false;

    return true;
}

/**
 * Valida uma URL.
 *
 * Utiliza o construtor nativo `URL` para verificar se a string
 * é uma URL válida com protocolo `http` ou `https`.
 *
 * @param {string} url - URL a ser validada.
 * @returns {boolean} `true` se a URL for válida; caso contrário, `false`.
 */
export function isValidURL(url) {
    try {
        const { protocol } = new URL(url);
        return protocol === "http:" || protocol === "https:";
    } catch {
        return false;
    }
}
