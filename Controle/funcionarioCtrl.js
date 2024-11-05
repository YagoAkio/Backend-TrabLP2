import Funcionario from "../Modelo/funcionario.js";

export default class FuncionarioCtrl{
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == 'POST' && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const cargo = requisicao.body.cargo;
            const salario = requisicao.body.salario;
            const dataAdmissao = requisicao.body.dataAdmissao;
            if(nome && cpf && email && telefone && endereco && cargo && salario && dataAdmissao){
                const funcionario = new Funcionario(0, nome, cpf, telefone, email, endereco, cargo, salario, dataAdmissao);

                funcionario.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Funcionario adicionada com sucesso!",
                        codigo: funcionario.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem:"Não foi possível incluir o funcionaro: " + erro.message
                    });
                });
            }
        }
    }

    editar(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'PUT' || requisicao.method == 'PATCH'  && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const cargo = requisicao.body.cargo;
            const salario = requisicao.body.salario;
            const dataAdmissao = requisicao.body.dataAdmissao;
            if(codigo > 0 && nome && cpf && email && telefone && endereco && cargo && salario && dataAdmissao){
                const funcionario = new Funcionario( codigo, nome, cpf, telefone, email, endereco);
                funcionario.editar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Funcionario editado com sucesso!"
                    });
                })
            }
        }
    }

    excluir(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'DELETE' && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            if(codigo){
                const funcionario = new Funcionario(codigo);
                funcionario.excluir().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Funcionario excluído com sucesso!"
                    });
                })
            }
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == "GET"){
            const codigo = requisicao.params.codigo;
            
            const funcionario = new Funcionario();
            funcionario.consultar(codigo).then((resultado) => {
                resposta.status(200).json(resultado);
                })
        }
    }
}