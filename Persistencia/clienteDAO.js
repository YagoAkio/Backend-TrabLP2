import Categoria from "../Modelo/categoria.js";
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
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET 
                            nome = ?,
                            cpf = ?,
                            telefone = ?,
                            email = ?,
                            endereco = ?
                            WHERE codigo = ?
                        `;
            const parametros = [cliente.nome,
                                cliente.cpf,
                                cliente.telefone,
                                cliente.email,
                                cliente.endereco,
                                cliente.codigo
                                ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }else{
            console.log("Erro ao alterar, parametro informado não é compativel com Cliente.")
        }
    }

    async excluir(categoria){
        if(categoria instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE codigo = ?`
            const parametros = [categoria.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }else{
            console.log("Erro ao excluir, parametro informado não é compativel com Cliente.")
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if(isNaN(parseInt(termo))){
            sql = `SELECT * FROM cliente WHERE cpf LIKE ? ORDER BY nome`;
            parametros.push("%"+termo+"%");
        }else{
            sql = `SELECT * FROM cliente WHERE codigo = ? OR cpf = ? ORDER BY nome`;
            parametros.push(termo);
        }
        const conexao = await conectar();

        const [registros, campos] = await conexao.query(sql,parametros);
        let listaCliente = [];
        for(const registro of registros){
            const cliente = new Cliente(registro.codigo,
                                            registro.nome,
                                            registro.cpf,
                                            registro.telefone,
                                            registro.email,
                                            registro.endereco
                                        );
            listaCliente.push(cliente);
        }
        return listaCliente;
    }
}