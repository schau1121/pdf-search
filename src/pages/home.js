import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/dashboard';
import '../styles/home.css'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <Dashboard />
            <button 
                type="button" 
                className='upload-page-button'
                onClick={() => navigate("/upload")}
            >+</button>
        </div>
    );
}