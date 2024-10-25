

export default class Funcionario {
    #codigo;
    #nome;
    #cpf;
    #telefone;
    #email;
    #endereco;
    #cargo;
    #salario;
    #dataAdmissao;

    constructor(codigo = 0, nome = "", cpf = "", telefone = "", email = "", endereco = "", cargo = "", salario = 0, dataAdmissao = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco;
        this.#cargo = cargo;
        this.#salario = salario;
        this.#dataAdmissao = dataAdmissao;
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

    get cargo() {
        return this.#cargo;
    }

    get salario() {
        return this.#salario;
    }

    get dataAdmissao() {
        return this.#dataAdmissao;
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

    set cargo(cargo) {
        this.#cargo = cargo;
    }

    set salario(salario) {
        this.#salario = salario;
    }

    set dataAdmissao(dataAdmissao) {
        this.#dataAdmissao = dataAdmissao;
    }

    // Método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            email: this.#email,
            endereco: this.#endereco,
            cargo: this.#cargo,
            salario: this.#salario,
            dataAdmissao: this.#dataAdmissao
        };
    }
}