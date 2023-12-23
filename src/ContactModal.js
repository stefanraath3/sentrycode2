// src/ContactModal.js
import React from "react";
import "./ContactModal.css";

function ContactModal({ show, onClose, onSend, submissionStatus }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal-heading">Get in Touch</h2> {/* Add this line */}
        <form onSubmit={onSend}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send</button>
          {submissionStatus && (
            <div className="submission-status">{submissionStatus}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
