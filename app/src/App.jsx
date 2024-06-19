// src/App.jsx

import React, { useState } from 'react';
import { createItem, updateItem, deleteItem } from './solana';

const App = () => {
    const [data, setData] = useState('');
    const [itemPubkey, setItemPubkey] = useState('');

    const handleCreate = async () => {
        await createItem(data);
        // Update UI accordingly
    };

    const handleUpdate = async () => {
        await updateItem(itemPubkey, data);
        // Update UI accordingly
    };

    const handleDelete = async () => {
        await deleteItem(itemPubkey);
        // Update UI accordingly
    };

    return (
        <div>
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Data"
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default App;
