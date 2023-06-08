import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './index.scss';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
            
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container login-page">
            <div className="page-content">
                <h1>Log In</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-row">
                        <div className="form-field">
                            <input
                                placeholder="Email address"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                id="pwd"
                                onChange={handleChange}
                            />
                        </div>
                        {error ? (
                            <div className="error">
                                <p>Incorrect email or password</p>
                            </div>
                        ) : null}
                        <div className="form-button">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
                <p>Don't have an account? Register <Link to="/signup">here</Link>.</p>
            </div>
        </div>
    );
}

export default Login;
