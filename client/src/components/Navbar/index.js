import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleQuestion, faUser, faCartShopping, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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
        </header>
    )
};

export default Navbar