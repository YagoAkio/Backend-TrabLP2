

export default class Fornecedor {
    #codigo;
    #nome;
    #cnpj;
    #telefone;
    #email;
    #endereco;

    constructor(codigo = 0, nome = "", cnpj = "", telefone = "", email = "", endereco = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cnpj = cnpj;
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

    get cnpj() {
        return this.#cnpj;
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

    set cnpj(cnpj) {
        this.#cnpj = cnpj;
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

    // Método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            cnpj: this.#cnpj,
            telefone: this.#telefone,
            email: this.#email,
            endereco: this.#endereco
        };
    }
}