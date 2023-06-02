import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { faHome, faCircleQuestion, faHeart, faCartShopping, faRightToBracket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
=======
import { faHome, faCircleQuestion, faHeart, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

function Navbar() {

    // FUNCTION TO CHECK IF USER IS LOGGED IN
    function ifLogged() {
        if (Auth.loggedIn()) {
            return (
                <NavLink exact="true" activeclassname="active" className="login-link" to="/logout">
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
                <NavLink exact="true" activeclassname="active" className="login-link" to="/login">
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

    // HEADER WITH NAVIGATION SECTION
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo"></img>
                </Link>
            </div>
            <nav>
                <NavLink exact="true" activeclassname="active" to="/">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHome} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HOME</span>
                    </div>
                </NavLink>
                <NavLink exact="true" activeclassname="active" to="/help">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCircleQuestion} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HELP</span>
                    </div>
                </NavLink>
                <NavLink exact="true" activeclassname="active" to="/my-favorites">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHeart} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>SAVED</span>
                    </div>
                </NavLink>
                <NavLink exact="true" activeclassname="active" className="cart-link" to="/cart">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>CART</span>
                    </div>
                </NavLink>
                {ifLogged()}
            </nav>
        </header>
    )
};
>>>>>>> 496fdaa3c16b8287ba7f4240f882262ffe8c9d79

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo"></img>
                </Link>
            </div>
            <button className="hamburger" onClick={handleToggle}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <nav className={isOpen ? 'open' : ''}>
                <NavLink exact activeclassname="active" to="/">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHome} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HOME</span>
                    </div>
                </NavLink>
                <NavLink exact activeclassname="active" to="/help">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCircleQuestion} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>HELP</span>
                    </div>
                </NavLink>
                <NavLink exact activeclassname="active" to="/my-favorites">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHeart} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>SAVED</span>
                    </div>
                </NavLink>
                <NavLink exact activeclassname="active" className="cart-link" to="/cart">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>CART</span>
                    </div>
                </NavLink>
                <NavLink exact activeclassname="active" className="login-link" to="/login">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faRightToBracket} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>LOGIN</span>
                    </div>
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
