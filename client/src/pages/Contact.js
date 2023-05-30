import React, { useState, useRef } from 'react';
// import '../../styles/style.css';
import { validateEmail } from '../utils/helpers';
import { contactForm } from '../utils/API'
// import { Modal, Button } from 'react-bootstrap'

// function MyModal(props) {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             id="modal"
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                 </Modal.Title>
//                 Sent!
//             </Modal.Header>
//             <Modal.Body>
//                 <h3>
//                     Your message has been submitted successfully! The team will get back to you shortly.
//                 </h3>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide} className="btn-secondary">Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

function Contact() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();

    // const [modalShow, setModalShow] = React.useState(false);

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
        // setModalShow(true)

        // If all fields have been filled in, clear the input
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section className="container">
            <h1 className="mx-auto text-center py-2">Get in touch</h1>
            <p className="mx-auto text-center py-2">Do you have a question about our products? Are you looking for a specific design but can't find it on our site? Would you like to place a large order and need a quote? Send us a message and we'll back to you ASAP!</p>
            <h4 className="mx-auto text-center mb-4 py-2">Write us a message</h4>
            <form ref={form} className="form mx-auto mb-5">
                <div className="mb-4">
                    <label
                        for="name"
                        className="form-label">
                        Your name:
                    </label>
                    <input
                        className="form-control"
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div className="mb-4">
                    <label
                        for="email"
                        className="form-label">
                        Your email address:
                    </label>
                    <input
                        className="form-control"
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div className="mb-4">
                    <label
                        for="message"
                        className="form-label">
                        Your message here:
                    </label>
                    <textarea
                        className="form-control"
                        value={message}
                        name="message"
                        onChange={handleInputChange}
                        onBlur={validateForm}
                    />
                </div>
                <div className="d-grid gap-2 pb-3">
                    <button
                        type="submit"
                        className="btn btn-secondary"
                        onClick={handleFormSubmit}>
                        Submit
                    </button>
                    {/* <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    /> */}
                </div>
            </form>
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
            )}
        </section>
    );
}

export default Contact;