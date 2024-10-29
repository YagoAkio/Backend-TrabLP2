import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente{
    #codigo;
    #nome;
    #cpf;
    #telefone;
    #email;
    #endereco;

    constructor(codigo = 0 ,
                nome = "", 
                cpf = "", 
                telefone = "", 
                email="", 
                endereco = "") {

        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco;
    }

    // Métodos get
    get codigo() {
        return this.#codigo;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    get endereco() {
        return this.#endereco;
    }

    // Métodos set
    set codigo(codigo) {
        this.#codigo = codigo;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    set cpf(cpf) {
        this.#cpf = cpf;
    }

    set telefone(telefone) {
        this.#telefone = telefone;
    }

    set email(email) {
        this.#email = email;
    }

    set endereco(endereco) {
        this.#endereco = endereco;
    }
    
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            email: this.#email,
            endereco: this.#endereco
        };
    }

    async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async editar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.editar(this);
    }

    async excluir(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async consultar(termo){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }
}