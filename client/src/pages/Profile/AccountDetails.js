import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../../utils/mutations';
import Auth from "../../utils/auth";


function AccountDetails() {
    const { data } = useQuery(QUERY_USER);
    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [modalShow, setModalShow] = React.useState(false);

    let user;

    if (data) {
        user = data.user;
    }

    const updateNameForm = async (event) => {
        event.preventDefault();
        try {
            await updateUser({
                variables: {
                    firstName: event.target.firstName.value,
                    lastName: event.target.lastName.value,
                },
            });
            setModalShow(true)

        } catch (e) {
            console.log(e);
        }
    };

    const updateEmailForm = async (event) => {
        event.preventDefault();
        try {
            await updateUser({
                variables: {
                    email: event.target.email.value,
                    password: event.target.password.value,
                },
            });
            setModalShow(true)

        } catch (e) {
            console.log(e);
        }
    };

    const updatePasswordForm = async (event) => {
        event.preventDefault();
        try {
            await updateUser({
                variables: {
                    currentPassword: event.target.currentPassword.value,
                    password: event.target.password.value,
                },
            });
            setModalShow(true)

        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteUser = async (event) => {
        event.preventDefault();
        try {
            await deleteUser({
                variables: {
                    password: event.target.password.value,
                },
            });
            setModalShow(true)

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='container'>
            <div>
                <h2 id="account">Account Details</h2>
            </div>
            <div className="account-details-page">
                <Tabs>
                    <aside>
                        <TabList>
                            <Tab>Change your name</Tab>
                            <Tab>Change your email</Tab>
                            <Tab>Change your password</Tab>
                            <Tab>Delete your account</Tab>
                        </TabList>
                    </aside>
                    <section>
                        <TabPanel>
                            <form onSubmit={updateNameForm}>
                                <div className="formInput">
                                    <label>First Name:</label>
                                    <input
                                        name="firstName"
                                        type="firstName"
                                        id="firstName"
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Last Name:</label>
                                    <input
                                        name="lastName"
                                        type="lastName"
                                        id="lastName"
                                    />
                                </div>
                                <div className="formInput">
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                            {modalShow && (
                                <div className="modal">
                                    <div>
                                        <button className="close" onClick={() => setModalShow(false)}>&times;</button>
                                        <p>Your name has been updated successfully.</p>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={updateEmailForm}>
                                <div className="formInput">
                                    <label>New email address:</label>
                                    <input
                                        name="email"
                                        type="email"
                                        id="email"
                                    />
                                </div>
                                <label>Please provide your password to validate this change:</label>
                                <div className="formInput">
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        id="pwd"
                                    />
                                </div>
                                <div className="formInput">
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                            {error ? (
                                <div className="error">
                                    <p>Incorrect password</p>
                                </div>
                            ) : null}
                            {modalShow && (
                                <div className="modal">
                                    <div>
                                        <button className="close" onClick={() => setModalShow(false)}>&times;</button>
                                        <p>Your email address has been updated successfully.</p>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={updatePasswordForm}>
                                <div className="formInput">
                                    <label>Current Password</label>
                                    <input
                                        placeholder="Password"
                                        name="currentPassword"
                                        type="password"
                                        id="current-pwd"
                                    />
                                </div>
                                <div className="formInput">
                                    <label>New Password</label>
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        id="pwd"
                                    />
                                </div>
                                <div className="formInput">
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                            {error ? (
                                <div className="error">
                                    <p>Incorrect password</p>
                                </div>
                            ) : null}
                            {modalShow && (
                                <div className="modal">
                                    <div>
                                        <button className="close" onClick={() => setModalShow(false)}>&times;</button>
                                        <p>Your password has been updated successfully.</p>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <p>Are you sure you want to delete your account? If you delete your account you will no longer have access to your order history and saved designs. Deleting your account is a non reversible action and you will have to create a new account to have access to all features again.</p>
                            <p>If you are sure you want to delete your account, please enter your password below:</p>
                            <form onSubmit={handleDeleteUser}>
                                <div className="formInput">
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        id="pwd"
                                    />
                                </div>
                                <div className="formInput">
                                    <button className="delete-button" type="submit">Submit</button>
                                </div>
                            </form>
                            {modalShow && (
                                <div className="modal">
                                    <div>
                                        <button className="close" onClick={() => { setModalShow(false); Auth.logout() }}>&times;</button>
                                        <p>Your account has been deleted.</p>
                                        <p>We're sorry to see you go, <Link to="/signup">create a new account</Link> if you have changed your mind.</p>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                    </section>
                </Tabs>

            </div >
        </div>
    )
}

export default AccountDetails;