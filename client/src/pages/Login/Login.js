import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        placeholder="Email address"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {/* <div>
                    <input
                        type="checkbox"
                        id="rememberMe"
                    />
                    <label
                        htmlFor="rememberMe"
                    >
                        Remember me
                    </label>
                </div> */}
                {error ? (
                    <div>
                        <p>Incorrect email address or password</p>
                    </div>
                ) : null}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <h3>Don't have an account? Register <Link to="/signup">here</Link></h3>
        </div>
    );
}

export default Login;
