import React from "react";

export const Child = ({ category, onInputChange, onAddCategory }) => {
    return (
        <div>
            <input type="text" value={category} onChange={onInputChange} />
            <button onClick={onAddCategory}>Add Category</button>
        </div>
    );
};