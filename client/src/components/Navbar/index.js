import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestion, faHeart, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => (
    // HEADER WITH NAVIGATION SECTION
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
                    <FontAwesomeIcon icon={faQuestion} color="#343131" />
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
                    <span>FAVORITES</span>
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
            <NavLink exact="true" activeclassname="active" className="login-link" to="/login">
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

export default Navbar
