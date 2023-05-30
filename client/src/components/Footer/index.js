import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    // FOOTER SECTION
    <footer>
        <ul className="social-icons">
            <li>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebook} color="#687a89" className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} color="#687a89" className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faInstagram} color="#687a89" className="anchor-icon" />
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} color="#687a89" className="anchor-icon" />
                </a>
            </li>
        </ul>
        <div>
            <p>© 2023 by Team Four</p>
        </div>
    </footer>
);

export default Footer