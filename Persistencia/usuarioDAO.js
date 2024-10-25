

export default class UsuarioDAO {
    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario(
                    
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

    }

    async editar(cliente){

    }

    async excluir(categoria){

    }

    async consultar(termo){
        
    }
}