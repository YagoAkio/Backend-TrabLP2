import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == 'POST' && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            if(nome && cpf && email && telefone && endereco){
                const cliente = new Cliente(0,nome, cpf, telefone, email, endereco);
                
                cliente.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente adicionada com sucesso!",
                        codigo: cliente.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem:"Não foi possível incluir a funcionario: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe corretamente todos os dados de um cliente conforme documentação em API."
                })
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Requisição inválida! Consulte a documentação da API."
            });    
        }
    }

    editar(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'PUT' && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            if(codigo > 0 && nome && cpf && email && telefone && endereco){
                const cliente = new Cliente(codigo,nome, cpf, telefone, email, endereco);
                cliente.editar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente editado com sucesso!"
                    });
                })
            }
        }
    }

    excluir(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'DELETE' && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            if(codigo > 0){
                const cliente = new Cliente(codigo);
                cliente.excluir().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente excluído com sucesso!"
                    });
                })
            }
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == "GET"){
            const codigo = requisicao.params.codigo;
            if(codigo > 0){
                codigo = ""
            }
            const cliente = new Cliente();
            cliente.consultar(codigo).then((resultado) => {
                resposta.status(200).json(resultado);
                })
        }
    }
}