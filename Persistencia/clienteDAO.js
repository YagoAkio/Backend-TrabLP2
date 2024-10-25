import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";


export default class ClienteDAO {
    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(255) NOT NULL,
                    cpf VARCHAR(15) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(codigo)
                );
            `
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(erro){
            console.log("Erro ao iniciar a tebela categoria!");
        }
    }

    async gravar(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(
                            nome,cpf,telefone,email,endereco
                        ) VALUES(?,?,?,?,?)`;
            const parametros = [cliente.nome,
                                cliente.cpf,
                                cliente.telefone,
                                cliente.email,
                                cliente.endereco
                                ];
            const resultado = await conexao.execute(sql,parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();

        }else{
            console.log("Erro ao gravar, parametro informado não é compativel com Cliente.")
        }
    }

    async editar(cliente){

    }

    async excluir(categoria){

    }

    async consultar(termo){

    }
}