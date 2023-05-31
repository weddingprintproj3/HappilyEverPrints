import React, { useState, useRef } from 'react';
import { validateEmail } from '../../utils/helpers';
import { contactForm } from '../../utils/API'


function Contact() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();

    const [modalShow, setModalShow] = React.useState(false);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        // Based on the input type, we set the state of either name, email, and message
        if (inputType === 'name') {
            setName(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else {
            setMessage(inputValue);
        }
    };

    const validateForm = (e) => {
        if (!e.target.value) {
            setErrorMessage(`***${e.target.name} is required`);
        }
    }

    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();

        // Check to see if the name field is empty. If so we set an error message to be displayed on the page
        if (!name) {
            setErrorMessage('***Name is required');
            return;
        }
        // Check to see if the email is not valid. If so we set an error message to be displayed on the page
        if (!validateEmail(email)) {
            setErrorMessage('***Email is invalid');
            return;
        }
        // Check to see if the message field is empty. If so we set an error message to be displayed on the page
        if (!message) {
            setErrorMessage('***Message is required');
            return;
        }

        // Call the contactForm function passing the name, email, and message fields as parameters
        contactForm(name, email, message);

        // Alert the user their message has been sent
        // alert(`Your message has been submitted successfully! Sara will get back to you shortly.`);
        setModalShow(true)

        // If all fields have been filled in, clear the input
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section>
            <h1>Get in touch</h1>
            <p>If you still have questions after reading our FAQ section feel free to send us a message and we'll back to you ASAP!</p>
            <h4>Write us a message</h4>
            <form ref={form} >
                <div>
                    <label
                        for="name">
                        Your name:
                    </label>
                    <input
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div>
                    <label
                        for="email">
                        Your email address:
                    </label>
                    <input
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div>
                    <label
                        for="message">
                        Your message here:
                    </label>
                    <textarea
                        value={message}
                        name="message"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handleFormSubmit}>
                        Submit
                    </button>
                </div>
            </form>
            {modalShow && (
                <div className="modal">
                    <div>
                        <button className="close" onClick={() => setModalShow(false)}>&times;</button>
                        <p>Your message has been submitted successfully! Our team will get back to you shortly.</p>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
        </section>
    );
}

export default Contact;