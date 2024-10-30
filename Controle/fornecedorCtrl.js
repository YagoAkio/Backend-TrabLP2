import { application } from "express";
import Fornecedor from "../Modelo/fornecedor.js";


export default class FornecedorCtrl{
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == 'POST' && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            if(nome && cnpj && email && telefone && endereco){
                const fornecedor = new Fornecedor(0,nome, cnpj, telefone, email, endereco);
                
                fornecedor.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"fornecedor adicionado com sucesso!",
                        codigo: fornecedor.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem:"Não foi possível incluir a fornecedor: " + erro.message
                    });
                });
            }
        }
    }

    editar(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'PUT' || requisicao.method == "PATCH" && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const email = requisicao.body.email;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            if(codigo && nome && cnpj && email && telefone && endereco){
                const fornecedor = new Fornecedor(codigo,nome, cnpj, telefone, email, endereco);
                
                fornecedor.editar()
                .then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"fornecedor adicionado com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem:"Não foi possível incluir a fornecedor: " + erro.message
                    });
                });
            }
        }
    }

    excluir(requisicao,resposta){
        resposta.type("application/json");
        if(requisicao.method == 'DELETE' && requisicao.is("application/json")){
            const codigo = requisicao.params.codigo;
            
            if(codigo){
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"fornecedor excluido com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem:"Não foi possível incluir a fornecedor: " + erro.message
                    });
                });
            }
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method == 'GET' && requisicao.is("application/json")){
            let codigo = requisicao.params.codigo;
            if(isNaN(codigo)){
                codigo = "";
            }
           
            const fornecedor = new Fornecedor();
            
            fornecedor.consultar(codigo)
            .then((listaFornecedor)=>{
                resposta.status(200).json(listaFornecedor);
            })
            .catch((erro)=>{
                resposta.status(500).json({
                    status:false,
                    mensagem:"Não foi possível incluir a fornecedor: " + erro.message
                });
            });
            
        }
    }
}