import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleQuestion, faHeart, faCartShopping, faRightToBracket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

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
                <NavLink exact={true} activeClassName="active" className="login-link" to="/logout">
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
                <NavLink exact={true} activeClassName="active" className="login-link" to="/login">
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
                <NavLink exact={true} activeClassName="active" to="/">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHome} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HOME</span>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName="active" to="/help">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCircleQuestion} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HELP</span>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName="active" to="/my-favorites">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHeart} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>SAVED</span>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName="active" className="cart-link" to="/cart">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>CART</span>
                    </div>
                </NavLink>
                {ifLogged()}
            </nav>
            <button className="hamburger" onClick={handleToggle}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            {isOpen && (
                <div className="mobile-menu">
                    <NavLink exact={true} activeClassName="active" to="/" onClick={closeMobileMenu}>HOME</NavLink>
                    <NavLink exact={true} activeClassName="active" to="/help" onClick={closeMobileMenu}>HELP</NavLink>
                    <NavLink exact={true} activeClassName="active" to="/my-favorites" onClick={closeMobileMenu}>SAVED</NavLink>
                    <NavLink exact={true} activeClassName="active" to="/cart" onClick={closeMobileMenu}>CART</NavLink>
                    {ifLogged()}
                </div>
            )}
        </header>
    )
};

export default Navbar
