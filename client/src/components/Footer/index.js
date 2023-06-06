import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <footer>
        <ul className="social-icons">
            <li>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="anchor-icon" />
                </a>
            </li>
        </ul>
        <div className="footer-text">
            <p>© 2023 by Happily Ever Prints</p>
        </div>
    </footer>
);

export default Footer
