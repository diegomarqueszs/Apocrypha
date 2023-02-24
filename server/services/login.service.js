import funcionarioPersistence from "../persistence/funcionario.persistence.js"

async function realizarLogin(cpf, senha){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);
    if(funcionario[0]){
        if (funcionario[0].cpf == cpf && funcionario[0].senha == senha){
            return funcionario;
        }else{
            return "CPF ou senha incorretos!";
        }
    }else{
        return "CPF ou senha incorretos!";
    }
}

export default {realizarLogin}