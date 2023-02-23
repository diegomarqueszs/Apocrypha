import funcionarioPersistence from "../persistence/funcionario.persistence.js"

async function getAllFuncionarios(){
    return await funcionarioPersistence.getAllFuncionarios();
}

async function getFuncionario(cpf){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);

    if(!funcionario[0]){
        console.log("CPF nao cadastrado")
        return ("CPF nao cadastrado")
    }else{
        return funcionario
    }
}

async function createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);

    if(funcionario[0]){
        console.log("CPF ja cadastrado")
        return ("CPF ja cadastrado")
    }else{
        return await funcionarioPersistence.createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin)
    }
}

async function deleteFuncionario(cpf){
    const funcionario = await funcionarioPersistence.getFuncionario(cpf);
    if(!funcionario[0]){
        console.log("CPF nao cadastrado")
        return ("CPF nao cadastrado")
    }else{
        return await funcionarioPersistence.deleteFuncionario(cpf)
    }
}

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