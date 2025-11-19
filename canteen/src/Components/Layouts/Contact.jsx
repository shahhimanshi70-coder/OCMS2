import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to contact us!</p>
      <form>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <textarea name="message" placeholder="Your message..." required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
