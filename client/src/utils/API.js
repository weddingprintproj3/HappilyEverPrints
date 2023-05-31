import axios from 'axios';

const contactForm = async (name, email, message) =>
  axios.post(`/api/contact`, { name, email, message });

export { contactForm };
