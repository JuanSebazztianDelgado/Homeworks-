import React, { useState } from "react";
import { Queue, Person } from "./peopleQueue"; 

const atmQueue = new Queue(); 

const PeopleQueue = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [queue, setQueue] = useState(atmQueue.getItems());
    const [error, setError] = useState(""); // Estado para manejar errores

    const handleAddPerson = (e) => {
        e.preventDefault();
        if (name && amount > 0) { // Validar que el importe sea mayor a 0
            const newPerson = new Person(name, parseFloat(amount)); 
            atmQueue.enqueue(newPerson); 
            setQueue(atmQueue.getItems()); 
            setName(""); 
            setAmount(""); 
            setError(""); // Limpiar el mensaje de error
        } else {
            setError("El importe debe ser mayor a 0."); // Mostrar mensaje de error
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Cola del Cajero Automático</h1>
            <form onSubmit={handleAddPerson} style={{ marginBottom: "20px" }}>
                <div>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Importe:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
                <button type="submit">Añadir a la Cola</button>
            </form>
            <h2>Cola Actual:</h2>
            <ul>
                {queue.map((person, index) => (
                    <li key={index}>{person.toString()}</li> 
                ))}
            </ul>
        </div>
    );
};

export default PeopleQueue;