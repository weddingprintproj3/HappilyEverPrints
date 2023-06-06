import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleQuestion, faUser, faCartShopping, faRightToBracket, faRightFromBracket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Auth from '../../utils/auth';

function NavItem({ to, className, icon, text }) {
    return (
        <NavLink exact="true" activeclassname="active" className={className} to={to}>
            <div className="icon-container">
                <FontAwesomeIcon icon={icon} color="#343131" />
            </div>
            <div className="text-container">
                <span>{text}</span>
            </div>
        </NavLink>
    )
}

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    function ifLogged() {
        if (Auth.loggedIn()) {
            return (
                <NavLink exact={true} activeclassname="active" className="login-link" to="/logout">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faRightToBracket} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>LOGOUT</span>
                    </div>
                </NavLink>
            )
        } else {
            return (
                <NavLink exact={true} activeclassname="active" className="login-link" to="/login">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faRightToBracket} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>LOGIN</span>
                    </div>
                </NavLink>
            )
        }
    }

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo"></img>
                </Link>
            </div>
            <nav>
                <NavItem to="/" className="home-link" icon={faHome} text="HOME" />
                <NavItem to="/help" className="help-link" icon={faCircleQuestion} text="HELP" />
                {Auth.loggedIn() &&
                    <NavItem to="/profile" className="profile-link" icon={faUser} text="PROFILE" />
                }
                <NavItem to="/cart" className="cart-link" icon={faCartShopping} text="CART" />
                {Auth.loggedIn() ?
                    <NavItem to="/logout" className="logout-link" icon={faRightFromBracket} text="LOGOUT" />
                    :
                    <NavItem to="/login" className="login-link" icon={faRightToBracket} text="LOGIN" />
                }
            </nav>
            <button className="hamburger" onClick={handleToggle}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            {isOpen && (
                <div className="mobile-menu">
                    <NavLink exact={true} activeclassname="active" to="/" onClick={closeMobileMenu}>HOME</NavLink>
                    <NavLink exact={true} activeclassname="active" to="/help" onClick={closeMobileMenu}>HELP</NavLink>
                    {Auth.loggedIn() &&
                        <NavLink exact={true} activeclassname="active" to="/profile" onClick={closeMobileMenu}>PROFILE</NavLink>
                    }
                    <NavLink exact={true} activeclassname="active" to="/cart" onClick={closeMobileMenu}>CART</NavLink>
                    {Auth.loggedIn() ?
                        <NavLink exact={true} activeclassname="active" to="logout" onClick={closeMobileMenu}>LOGOUT</NavLink>
                        :
                        <NavLink exact={true} activeclassname="active" to="login" onClick={closeMobileMenu}>LOGIN</NavLink>
                    }
                </div>
            )}
        </header>
    )
};

export default Navbar