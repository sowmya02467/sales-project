// src/components/SaleOrder.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderModal from './OrderModal.js';
import '../Styles/App.css';

const SaleOrder = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        navigate('/login');
    };

    const handleAddOrder = (order) => {
        setOrders([...orders, { ...order, status: 'active' }]);
        setShowModal(false);
    };

    const handleEditOrder = (index) => {
        const updatedOrders = [...orders];
        updatedOrders[index] = { ...updatedOrders[index], ...selectedOrder };
        setOrders(updatedOrders);
        setShowModal(false);
    };

    const openEditModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <div className="order-container">
            <h2>Sale Order Management</h2>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <div className="tabs">
                <button onClick={() => setActiveTab('active')} className={activeTab === 'active' ? 'active' : ''}>Active Sale Orders</button>
                <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>Completed Sale Orders</button>
            </div>
            <button onClick={() => setShowModal(true)} className="add-order-button">+ Sale Order</button>
            {showModal && <OrderModal order={selectedOrder} onClose={() => setShowModal(false)} onSave={handleAddOrder} />}
            <div className="orders">
                {orders.filter(order => order.status === activeTab).map((order, index) => (
                    <div key={index} className="order-item">
                        <span>{order.name}</span>
                        <button onClick={() => openEditModal(order)} className="order-options-button">...</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaleOrder;
