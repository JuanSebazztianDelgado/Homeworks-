class Stack {
    constructor() {
        this.items = [];
    }

    push(value) {
        this.items.push(value);
    }

    pop() {
        return this.items.length > 0 ? this.items.pop() : null;
    }

    peek() {
        return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        return this.items.slice().reverse();
    }
}

class Book {
    constructor(nombre, ISBN, autor, editorial) {
        this.nombre = nombre;
        this.ISBN = ISBN;
        this.autor = autor;
        this.editorial = editorial;
    }

    toString() {
        return `Nombre: ${this.nombre}, ISBN: ${this.ISBN}, Autor: ${this.autor}, Editorial: ${this.editorial}`;
    }
}


export { Stack, Book };