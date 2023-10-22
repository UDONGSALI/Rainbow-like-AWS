import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

window.alert = function(message) {
    Swal.fire({
        title: '알림',
        text: message,
        confirmButtonText: '확인'
    });
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);