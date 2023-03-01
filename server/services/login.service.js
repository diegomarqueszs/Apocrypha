import funcionarioPersistence from "../persistence/funcionario.persistence.js"

/*
 * Função para realizar um login de um funcionario.
 * Ela recebe um cpf e senha já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o cpf é passado para o persistence para obter o funcionario direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/
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