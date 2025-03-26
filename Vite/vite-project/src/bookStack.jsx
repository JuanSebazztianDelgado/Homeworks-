import React, { useState } from "react";
import { Stack, Book } from "./bookStack";

function BookStack() {
    const [stack] = useState(new Stack()); 
    const [books, setBooks] = useState([]); 
    const [formData, setFormData] = useState({
        nombre: "",
        ISBN: "",
        autor: "",
        editorial: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        const newBook = new Book(formData.nombre, formData.ISBN, formData.autor, formData.editorial);
        stack.push(newBook); 
        setBooks([...stack.print()]); 
        setFormData({ nombre: "", ISBN: "", autor: "", editorial: "" }); 
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Pila de Libros</h1>
            <form onSubmit={handleAddBook} style={{ marginBottom: "20px" }}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        type="text"
                        name="ISBN"
                        value={formData.ISBN}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Autor:</label>
                    <input
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Editorial:</label>
                    <input
                        type="text"
                        name="editorial"
                        value={formData.editorial}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Añadir Libro</button>
            </form>

            <h2>Contenido de la Pila:</h2>
            {books.length === 0 ? (
                <p>La pila está vacía.</p>
            ) : (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            <strong>{book.nombre}</strong> - ISBN: {book.ISBN}, Autor: {book.autor}, Editorial: {book.editorial}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookStack;