const pattern = /^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}-[0-9]{2}$/;

const multiplicadores = [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
];

function multiplicarSomarDividir(cnpj, length, shift) {
    let soma = 0;
    for (let i = 0; i < length; i++) {
        const char = cnpj.charAt(i);
        const valor = isNaN(parseInt(char, 10)) ? 0 : parseInt(char, 10);
        soma += valor * multiplicadores[i + shift];
    }
    return soma % 11;
}

function validaCNPJ(cnpj) {
    if (!cnpj || !pattern.test(cnpj)) return false;
    let cnpjSemMascara = cnpj.replace(/[\.\/-]/g, "");
    cnpjSemMascara = cnpjSemMascara.substring(0, cnpjSemMascara.length - 2);
    
    const soma1 = multiplicarSomarDividir(cnpjSemMascara, 12, 1);
    const dv1 = soma1 < 2 ? 0 : 11 - soma1;
    cnpjSemMascara += dv1;
    
    const soma2 = multiplicarSomarDividir(cnpjSemMascara, 13, 0);
    const dv2 = soma2 < 2 ? 0 : 11 - soma2;
    
    return dv1 === parseInt(cnpj.charAt(cnpj.length - 2), 10) &&
           dv2 === parseInt(cnpj.charAt(cnpj.length - 1), 10);
}

function gerarCnpj() {
    const caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let cnpjBase = "";
    for (let i = 0; i < 12; i++) {
        cnpjBase += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    
    const cnpjNumerico = cnpjBase.replace(/[^0-9]/g, "0");
    
    const soma1 = multiplicarSomarDividir(cnpjNumerico, 12, 1);
    const dv1 = soma1 < 2 ? 0 : 11 - soma1;
    cnpjBase += dv1;
    
    const soma2 = multiplicarSomarDividir(cnpjNumerico + dv1, 13, 0);
    const dv2 = soma2 < 2 ? 0 : 11 - soma2;
    cnpjBase += dv2;

    return `${cnpjBase.substring(0,2)}.${cnpjBase.substring(2,5)}.${cnpjBase.substring(5,8)}/${cnpjBase.substring(8,12)}-${cnpjBase.substring(12,14)}`;
}
