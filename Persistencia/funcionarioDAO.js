import Funcionario from "../Modelo/funcionario.js";
import conectar from "./Conexao.js";


export default class FuncionarioDAO {
    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS funcionario(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(255) NOT NULL,
                    cpf VARCHAR(15) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    cargo VARCHAR(255) NOT NULL,
                    salario DECIMAL(10,2) NOT NULL,
                    data_admissao DATE NOT NULL,
                    CONSTRAINT pk_funcionario PRIMARY KEY (codigo),
                    CONSTRAINT unique_cpf UNIQUE (cpf)
                );
            `
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(erro){
            console.log("Erro ao iniciar a tebela funcionario!");
        }
    }

    async gravar(funcionario){
        if(funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql = `INSERT INTO funcionario(
                            nome,
                            cpf,
                            telefone,
                            email,
                            endereco,
                            cargo,
                            salario,
                            data_admissao
                        ) VALUES(?,?,?,?,?,?,?,?)`;
            const parametros = [
                funcionario.nome,
                funcionario.cpf,
                funcionario.telefone,
                funcionario.email,
                funcionario.endereco,
                funcionario.cargo,
                funcionario.salario,
                funcionario.dataAdmissao
                ];
            const resultado = await conexao.execute(sql,parametros);
            funcionario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(funcionario){
        if(funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql = `UPDATE funcionario SET
                            nome = ?,
                            cpf = ?,
                            telefone = ?,
                            email = ?,
                            endereco = ?,
                            cargo = ?,
                            salario = ?,
                            data_admissao = ? 
                            WHERE codigo = ?`;
            const parametros = [ 
                funcionario.nome,
                funcionario.cpf,
                funcionario.telefone,
                funcionario.email,
                funcionario.endereco,
                funcionario.cargo,
                funcionario.salario,
                funcionario.dataAdmissao,
                funcionario.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(funcionario){
        if(funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql = `DELETE FROM funcionario WHERE codigo = ?`
            const parametros = [funcionario.codigo,];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if(isNaN(parseInt(termo))){
            sql = `SELECT * FROM funcionario WHERE nome LIKE ? ORDER BY nome`;
            parametros.push("%"+termo+"%");
        }else{
            sql = `SELECT * FROM funcionario WHERE codigo = ? ORDER BY salario`;
            parametros.push(termo);
        }
        
        const conexao = await conectar();

        const [registros,campos] = await conexao.query(sql,parametros);
        let listaFuncionario = [];
        for(const registro of registros){
            const cliente = new Funcionario(
                registro.codigo,
                registro.nome,
                registro.cpf,
                registro.telefone,
                registro.email,
                registro.endereco,
                registro.cargo,
                registro.salario,
                registro.dataAdmissao
            );
            listaFuncionario.push(cliente);
        }
        await conexao.release();
        return listaFuncionario;
    }
}