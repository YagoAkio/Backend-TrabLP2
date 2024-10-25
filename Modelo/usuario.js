

export default class Usuario {
    #codigo;
    #email;
    #senha;
    #funcionario;
    #cliente;

    constructor(codigo = 0, email = "", senha = "", funcionario = {}, cliente = {}) {
        this.#codigo = codigo;
        this.#email = email;
        this.#senha = senha;
        this.#funcionario = funcionario;
        this.#cliente = cliente;
    }

    // Métodos get
    get codigo() {
        return this.#codigo;
    }

    get email() {
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    get funcionario() {
        return this.#funcionario;
    }

    get cliente() {
        return this.#cliente;
    }

    // Métodos set
    set codigo(codigo) {
        this.#codigo = codigo;
    }

    set email(email) {
        this.#email = email;
    }

    set senha(senha) {
        this.#senha = senha;
    }

    set funcionario(funcionario) {
        this.#funcionario = funcionario;
    }

    set cliente(cliente) {
        this.#cliente = cliente;
    }

    // Método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            email: this.#email,
            senha: this.#senha,
            funcionario: this.#funcionario,
            cliente: this.#cliente
        };
    }
}