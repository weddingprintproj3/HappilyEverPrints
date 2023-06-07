import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import AccountDetails from './AccountDetails';
import Auth from '../../utils/auth';

import './Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faHeart, faGaugeHigh, faUser } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const navigate = useNavigate();
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    function Dashboard() {
        const name = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);

        return (
            <div className='container'>
                <div>
                    <h2>Dashboard</h2>
                </div>
                <div>
                    {user ? (
                        <div className="panel-content">
                            <h3>Hello, <span>{name}!</span></h3>
                            <p>From your account dashboard you can view your recent orders, view your favorite designs, and edit your password and account details.</p>
                        </div>
                    ) : "loading..."}
                </div>
            </div>
        )
    }

    function categoryToUrl(category) {
        if (category === "Invitations") {
            return "/products/invitation";
        } else if (category === "Menus") {
            return "/products/menu";
        } else if (category === "Thank You Cards") {
            return "/products/thankyou";
        } else if (category === "Seating Charts") {
            return "/products/guestlist";
        }
    }

    function Orders() {

        return (
            <div className='container'>
                <div>
                    <h2>Orders</h2>
                </div>
                <div>
                    {user ? (
                        <>
                            {user.orders.map((order) => (
                                <div className="panel-content" key={order._id}>
                                    <h3>
                                        Your order from {new Date(parseInt(order.purchaseDate)).toLocaleDateString()} contained the following items:
                                    </h3>
                                    <div>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <div className='order-card'>
                                                    <img className="product-img" src={product.image} alt="product.name" />
                                                    <Link className="product-link" to={`${categoryToUrl(product.category.name)}/${product._id}`}>{product.name}</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : "loading..."}
                </div>
            </div>
        )
    }

    function Favorites() {
        return (
            <div className='container'>
                <div>
                    <h2>Favorites</h2>
                </div>
                <div>
                    {user ? (
                        <>
                            {user.savedProducts.length > 0 ? (
                                <>
                                    {user.savedProducts.map((product, index) => (
                                        <div className="panel-content" key={index}>
                                            <div className='fav-card'>
                                                <img className="product-img" src={product.image} alt={product.name} />
                                                <Link className="product-link" to={`${categoryToUrl(product.category.name)}/${product._id}`}>{product.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : <h3>You haven't saved any products yet</h3>}
                        </>
                    ) : "loading..."}
                </div>
            </div>
        )
    }

    if (Auth.loggedIn()) {
        return (
            <>
                <div className="profile-page">
                    <Tabs>
                        <aside>
                            <TabList>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faGaugeHigh} color="#343131" /></span>Dashboard</p>
                                </Tab>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faCartShopping} color="#343131" /></span>Orders</p>
                                </Tab>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faHeart} color="#343131" /></span>Favorites</p>
                                </Tab>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faUser} color="#343131" /></span>Account details</p>
                                </Tab>
                                <Tab onClick={() => navigate('/logout')}>
                                    <p onClick={() => navigate('/logout')}><span><FontAwesomeIcon icon={faRightFromBracket} color="#343131" /></span>Logout</p>
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
                                <AccountDetails />
                            </TabPanel>
                            <TabPanel>
                                {/* <>This section is blank on purpose to avoid an error message because there are X tabs and there must be X tab panels. Log out redirects to logout page</> */}
                            </TabPanel>
                        </section>
                    </Tabs>
                </div>
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

export default Profile;