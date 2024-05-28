// src/components/OrderModal.js
import React, { useState, useEffect } from 'react';

import '../Styles/App.css';

const OrderModal = ({ order, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (order) {
            setName(order.name);
        }
    }, [order]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{order ? 'Edit Sale Order' : 'Create Sale Order'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Order Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly={order && order.status === 'completed'}
                        />
                    </div>
                    {!order || order.status !== 'completed' ? <button type="submit">Save</button> : null}
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
