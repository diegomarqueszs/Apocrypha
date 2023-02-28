function cpfValido(cpf) {
    if (cpf.length != 11){
        return "CPF deve possuir 11 caracteres!"
    }
    else if (!Number(cpf)){
        return "CPF deve possuir apenas números!"
    }else if (!cpf) {
        return "CPF inválido!"
    }else{
        return "CPF válido!"
    }
}
module.exports = cpfValido;