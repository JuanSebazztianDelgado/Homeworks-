import React, { useState } from "react";
import { Child } from "./Child";

export const Parent = () => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleInputChange = (event) => {
        setCategory(event.target.value);
    };

    const addCategory = () => {
        if (category.trim() !== "") {
            setCategories([...categories, category]);
            setCategory(""); // Limpiar el input después de agregar
        }
    };

    return (
        <div>
            <h2>Category List</h2>
            <Child 
                category={category} 
                onInputChange={handleInputChange} 
                onAddCategory={addCategory} 
            />
            <ul>
                {categories.map((cat, index) => (
                    <li key={index}>{cat}</li>
                ))}
            </ul>
        </div>
    );
};