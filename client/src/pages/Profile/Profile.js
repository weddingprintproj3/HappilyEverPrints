import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCartShopping, faRightToBracket, faHeart, faGaugeHigh, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Profile.scss'

function Profile() {
    const navigate = useNavigate();

    function Dashboard() {
        return (
            <div className="panel-content">
                <h1>Hello <span>USER</span> (not <span>USER</span>? <Link to="/logout">Log out</Link>)</h1>
                <h2>From your account dashboard you can view your recent orders, view your favorite designs, manage your shipping addresses, and edit your password and account details.</h2>
            </div>
        )
    }

    function Orders() {
        return (
            <div className="panel-content"></div>
        )
    }

    function Favorites() {
        return (
            <div className="panel-content"></div>
        )
    }

    function Addresses() {
        return (
            <div className="panel-content"></div>
        )
    }

    function AccountDetails() {
        return (
            <div className="panel-content"></div>
        )
    }

    return (
        <div className="profile-page">
            <Tabs>
                <aside>
                    <TabList>
                        <Tab>
                            <p>Dashboard <span><FontAwesomeIcon icon={faGaugeHigh} color="#343131" /></span></p>
                        </Tab>
                        <Tab>
                            <p>Orders <span><FontAwesomeIcon icon={faCartShopping} color="#343131" /></span></p>
                        </Tab>
                        <Tab>
                            <p>Favorites <span><FontAwesomeIcon icon={faHeart} color="#343131" /></span></p>
                        </Tab>
                        <Tab>
                            <p>Addresses <span><FontAwesomeIcon icon={faAddressBook} color="#343131" /></span></p>
                        </Tab>
                        <Tab>
                            <p>Account details <span><FontAwesomeIcon icon={faUser} color="#343131" /></span></p>
                        </Tab>
                        <Tab>
                            <p onClick={() => navigate('/logout')}>Logout <span><FontAwesomeIcon icon={faRightToBracket} color="#343131" /></span></p>
                        </Tab>
                    </TabList>
                </aside>
                <section>
                    <TabPanel>
                        {Dashboard()}
                    </TabPanel>
                    <TabPanel>
                        {Orders()}
                    </TabPanel>
                    <TabPanel>
                        {Favorites()}
                    </TabPanel>
                    <TabPanel>
                        {Addresses()}
                    </TabPanel>
                    <TabPanel>
                        {AccountDetails()}
                    </TabPanel>
                </section>
            </Tabs>
        </div>
    )
}

export default Profile;
