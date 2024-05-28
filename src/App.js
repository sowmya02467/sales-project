
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Login from './Components/Login';
import SaleOrder from './Components/SaleOrder';
import './Styles/App.css';

const lightTheme = {
    body: '#FFF',
    text: '#000',
    toggleBorder: '#FFF',
    background: '#363537',
};

const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
};

const AppContainer = styled.div`
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    min-height: 100vh;
`;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <Router>
                <AppContainer>
                    <header>
                        <button onClick={themeToggler}>
                            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        </button>
                    </header>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/orders" element={isAuthenticated ? <SaleOrder /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to={isAuthenticated ? "/orders" : "/login"} />} />
                    </Routes>
                </AppContainer>
            </Router>
        </ThemeProvider>
    );
};

export default App;

