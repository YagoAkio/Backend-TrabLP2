import conectar from "./Conexao.js";
import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorDAO {
    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(255) NOT NULL,
                    cnpj VARCHAR(19) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    CONSTRAINT pk_fornecedor PRIMARY KEY(codigo)
                );
            `
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(erro){
            console.log("Erro ao iniciar a tebela fornecedor!");
        }
    }

    async gravar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(
                            nome,cnpj,telefone,email,endereco
                        ) VALUES(?,?,?,?,?)`;
            const parametros = [fornecedor.nome,
                                fornecedor.cnpj,
                                fornecedor.telefone,
                                fornecedor.email,
                                fornecedor.endereco
                                ];
            const resultado = await conexao.execute(sql,parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();

        }else{
            console.log("Erro ao gravar, parametro informado não é compativel com Fornecedor.")
        }
    }

    async editar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET 
                            nome = ?,
                            cnpj = ?,
                            telefone = ?,
                            email = ?,
                            endereco = ?
                            WHERE codigo = ?
                        `;
            const parametros = [fornecedor.nome,
                                fornecedor.cnpj,
                                fornecedor.telefone,
                                fornecedor.email,
                                fornecedor.endereco,
                                fornecedor.codigo
                                ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }else{
            console.log("Erro ao alterar, parametro informado não é compativel com Cliente.")
        }
    }

    async excluir(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE codigo = ?`
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }else{
            console.log("Erro ao excluir, parametro informado não é compativel com Fornecedor.")
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if(isNaN(parseInt(termo))){
            sql = `SELECT * FROM fornecedor WHERE nome LIKE ? ORDER BY nome`;
            parametros.push("%"+termo+"%");
        }else{
            sql = `SELECT * FROM fornecedor WHERE codigo = ? ORDER BY codigo`;
            parametros.push(termo);
        }
        const conexao = await conectar();

        const [registros, campos] = await conexao.query(sql,parametros);
        let listaFornecedor = [];
        for(const registro of registros){
            const fornecedor = new Fornecedor(registro.codigo,
                                            registro.nome,
                                            registro.cnpj,
                                            registro.telefone,
                                            registro.email,
                                            registro.endereco
                                        );
            listaFornecedor.push(fornecedor);
        }
        return listaFornecedor;
    }
}