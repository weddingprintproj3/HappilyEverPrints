import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import './Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCartShopping, faRightToBracket, faHeart, faGaugeHigh, faUser } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const navigate = useNavigate();
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    function Dashboard() {
        return (
            <>
                {user ? (
                    <div className="panel-content">
                        <h1>Hello <span>{user.firstName}</span> (not <span>{user.firstName}</span>? <Link to="/logout">Log out</Link>)</h1>
                        <h2>From your account dashboard you can view your recent orders, view your favorite designs, manage your shipping addresses, and edit your password and account details.</h2>
                    </div>
                ) : "loading..."}
            </>
        )
    }

    function Orders() {
        return (
            <>
                {user ? (
                    <>
                        {user.orders.map((order) => (
                            <div key={order._id}>
                                <h3>
                                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                </h3>
                                <div>
                                    {order.products.map(({ _id, name, price, quantity }, index) => (
                                        <div key={index}>
                                            <div>
                                                <span>{quantity}</span>
                                                <Link to={`/products/${_id}`}>{name}</Link>
                                                <span>${price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : "loading..."}
            </>
        )
    }

    function Favorites() {
        return (
            <div className="panel-content">
                <h1>Favorites</h1>
            </div>
        )
    }

    function Addresses() {
        return (
            <div className="panel-content">
                <h1>Addresses</h1>
            </div>
        )
    }

    function AccountDetails() {
        return (
            <div className="panel-content">
                <h1>Account Details</h1>
            </div>
        )
    }

    return (
        <>
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
                        <TabPanel>
                            {/* <>This section is blank on purpose to avoid an error message because there are X tabs and there must be X tab panels. Log out redirects to logout page</> */}
                        </TabPanel>
                    </section>
                </Tabs>
            </div>
        </>
    )
}

export default Profile;
