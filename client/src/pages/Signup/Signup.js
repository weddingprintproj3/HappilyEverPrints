import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './index.scss';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container signup-page">
            <div className="page-content">
                <h1>Sign Up</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-row">
                        <div className="form-field">
                            <input
                                placeholder="First name"
                                name="firstName"
                                type="firstName"
                                id="firstName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                placeholder="Last name"
                                name="lastName"
                                type="lastName"
                                id="lastName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                placeholder="Email"
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
                    </div>
                    <div className="form-button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link> instead.</p>
            </div>
        </div>
    );
}

export default Signup;
