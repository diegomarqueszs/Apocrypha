import loginService from "../services/login.service.js"

async function realizarLogin(req, res){
    const cpf = req.body.cpf;
    const senha = req.body.senha;
    console.log("controller");
    console.log(cpf);
    console.log(senha);

    if (!cpf || !senha){
        res.send('<script>alert("CPF ou senha inválidos!");window.history.back();</script>')
    }
    else if(cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF deve ter 11 digitos númericos!");window.history.back();</script>')
    }else{
        const rows = await loginService.realizarLogin(cpf, senha);
        if(rows == "CPF ou senha incorretos!"){
            res.send('<script>alert("CPF ou senha incorretos!");window.history.back();</script>')
        }
        else if (rows[0]){
            res.cookie('cpfFunc', cpf, { maxAge: 900000, httpOnly: true });
            res.cookie('ehAdm', rows[0].admin, { maxAge: 900000, httpOnly: true });
            console.log(rows[0].admin, cpf)
            res.redirect('/loan/')
        }
        else{
            res.send(rows);
        }
    }
}


export default {realizarLogin}