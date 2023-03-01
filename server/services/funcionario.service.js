import funcionarioPersistence from "../persistence/funcionario.persistence.js"

/*
 * Função que obtém todos os funcionarios do banco de dados 
 * e retorna-os para o controller
*/
async function getAllFuncionarios(){
    return await funcionarioPersistence.getAllFuncionarios();
}

/*
 * Função para buscar um funcionario pelo cpf.
 * Ela recebe um cpf já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o cpf é passado para o persistence para obter o funcionario direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/
async function getFuncionario(cpf){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);

    if(!funcionario[0]){
        console.log("CPF nao cadastrado")
        return ("CPF nao cadastrado")
    }else{
        return funcionario
    }
}

/*
 * Função para cadastrar um funcionario.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer o cadastro no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);

    if(funcionario[0]){
        console.log("CPF ja cadastrado")
        return ("CPF ja cadastrado")
    }else{
        return await funcionarioPersistence.createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin)
    }
}

/*
 * Função para deletar um funcionario pelo cpf.
 * Ela recebe um cpf já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o cpf é passado para o persistence para fazer a remoçao do funcionario direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function deleteFuncionario(cpf){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);
    if(!funcionario[0]){
        console.log("CPF nao cadastrado")
        return ("CPF nao cadastrado")
    }else{
        return await funcionarioPersistence.deleteFuncionario(cpf)
    }
}

/*
 * Função para alterar um funcionario.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer a alteraçao no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function updateFuncionario(cpfAtual, cpf, nome, telefone, endereco, salario, senha, admin){
    const funcionario = await funcionarioPersistence.getFuncionario(cpfAtual);
    const funcionario2 = await funcionarioPersistence.getFuncionario(cpf);

    if(!funcionario[0]){
        console.log("CPF nao cadastrado")
        return ("CPF nao cadastrado")
    }else{
        if(cpfAtual.localeCompare(cpf) != 0 && funcionario2[0]){
            console.log("O novo CPF ja esta cadastrado")
            return "O novo CPF ja esta cadastrado"
        }
        return await funcionarioPersistence.updateFuncionario(cpfAtual, cpf, nome, telefone, endereco, salario, senha, admin)
    }
}

export default {getAllFuncionarios, getFuncionario, createFuncionario, deleteFuncionario, updateFuncionario}