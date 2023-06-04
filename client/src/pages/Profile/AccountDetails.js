import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../../utils/mutations';

function AccountDetails() {
    const { data } = useQuery(QUERY_USER);
    const [updateUser] = useMutation(UPDATE_USER);
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
                },
            });
            setModalShow(true)

        } catch (e) {
            console.log(e);
        }
    };

    const updatePassword = async (event) => {
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

    const deleteUser = (event) => {
        event.preventDefault();
        try {
            DELETE_USER({
                variables: {
                    userID: event.target.userID.value,
                },
            });

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
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
                                <div>
                                    <input
                                        placeholder={user.firstName}
                                        name="firstName"
                                        type="firstName"
                                        id="firstName"
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder={user.lastName}
                                        name="lastName"
                                        type="lastName"
                                        id="lastName"
                                    />
                                </div>
                                <div>
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
                                <div>
                                    <input
                                        placeholder={user.email}
                                        name="email"
                                        type="email"
                                        id="email"
                                    />
                                </div>
                                <div>
                                    <button type="submit">Update</button>
                                </div>
                            </form>
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
                            <form onSubmit={updatePassword}>
                                <div>
                                    <label>Current Password</label>
                                    <input
                                        placeholder="Password"
                                        name="currentPassword"
                                        type="password"
                                        id="current-pwd"
                                    />
                                </div>
                                <div>
                                    <label>New Password</label>
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        id="pwd"
                                    />
                                </div>
                                <div>
                                    <button type="submit">Update</button>
                                </div>
                            </form>
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
                            <h2>Delete your account here</h2>
                        </TabPanel>
                    </section>
                </Tabs>

            </div >
        </>
    )
}

export default AccountDetails;