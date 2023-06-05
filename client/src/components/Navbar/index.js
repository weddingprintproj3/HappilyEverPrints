import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleQuestion, faUser, faCartShopping, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

function NavItem({to, activeClassName, className, icon, text }) {
    return (
        <NavLink exact activeClassName={activeClassName} className={className} to={to} >
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
                <NavItem to="/" activeClassName="active" icon={faHome} text="HOME" />
                <NavItem to="/help" activeClassName="active" icon={faCircleQuestion} text="HELP" />
                {Auth.loggedIn() && 
                    <NavItem to="/profile" activeClassName="active" icon={faUser} text="PROFILE" />
                }
                <NavItem to="/cart" activeClassName="active" className="cart-link" icon={faCartShopping} text="CART" />
                {Auth.loggedIn() ?
                    <NavItem to="/logout" activeClassName="active" className="logout-link" icon={faRightFromBracket} text="LOGOUT" />
                :
                    <NavItem to="/login" activeClassName="active" className="login-link" icon={faRightToBracket} text="LOGIN" />
                }
            </nav>
        </header>
    )
};

export default Navbar
