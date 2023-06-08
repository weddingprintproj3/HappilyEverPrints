import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import './index.scss';

function Success() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("session_id")

    if (Auth.loggedIn()) {
        return (
            <>
                {user ? (
                    <div className="success-page">
                        <div className="container">
                            <h1>Thank you, <span>{user.firstName}!</span></h1>
                            <h3>Your order has been placed successfully!</h3>
                            <p>Your order number is <span className='order-number'>{id}</span>. Please keep this order number for your records.</p>
                        </div>
                    </div>
                ) : "loading..."}
            </>
        )
    } else {
        return (
            <>
                <h3>Oops! You need log in / create an account if you want access to this section.</h3>
            </>
        )
    }
}

export default Success;