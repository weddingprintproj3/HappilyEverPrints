import React from "react";
import { useNavigate } from 'react-router-dom';
import Auth from "../../utils/auth";

function Logout() {
    const navigate = useNavigate();
    
    return (
        <>
            <div>
                <h1>Are you sure you want to log out?</h1>
                <p>If you log out you won't be able to save any designs or proceed with your order.</p>
            </div>
            <div>
                <button type="submit" onClick={() => navigate('/profile')}>Cancel</button>
                <button type="submit" onClick={() => Auth.logout()}>Logout</button>
            </div>
        </>
    )
}

export default Logout;