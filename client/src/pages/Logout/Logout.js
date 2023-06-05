import React from "react";
import { useNavigate } from 'react-router-dom';
import Auth from "../../utils/auth";
import './index.scss';

function Logout() {
    const navigate = useNavigate();

    return (
        <div className="container logout-page">
            <div className="page-content">
                <h1>Log Out</h1>
                <div className="text-area">
                    <h2>Are you sure you want to log out?</h2>
                    <p>You won't be able to favorite any designs or complete your order if you choose to log out.</p>
                </div>
                <div className="button-container">
                    <button type="submit" onClick={() => navigate('/profile')}>Cancel</button>
                    <button className="logout-button" type="submit" onClick={() => Auth.logout()}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Logout;