import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleQuestion, faUser, faCartShopping, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

function Navbar() {

    // FUNCTION TO CHECK IF USER IS LOGGED IN
    function ifLogged() {
        if (Auth.loggedIn()) {
            return (
                <>
                    <NavLink exact="true" activeclassname="active" className="login-link" to="/logout">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faRightToBracket} color="#343131" />
                        </div>
                        <div className="text-container">
                            <span>LOGOUT</span>
                        </div>
                    </NavLink>
                </>
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
                <NavLink exact="true" activeclassname="active" to="/profile">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} color="#343131" />
                    </div>
                    <div className="text-container">
                        <span>PROFILE</span>
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

export default Navbar
