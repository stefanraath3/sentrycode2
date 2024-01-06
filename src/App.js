// src/App.js
import React, { useState } from "react";
import "./App.css";
import BackgroundAnimation from "./BackgroundAnimation";
import ContactModal from "./ContactModal";
import { supabase } from "./supabaseClient";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    const form = event.target;
    setSubmissionStatus("Sending..."); // Inform the user that the message is being sent
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const { error } = await supabase.from("contacts").insert([data]);

    if (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("Failed to send message. Please try again.");
    } else {
      console.log("Form submitted successfully");
      setSubmissionStatus("Message sent successfully!");
      setTimeout(() => {
        setSubmissionStatus("");
        handleCloseModal();
        form.reset(); // Reset the form to clear the fields
      }, 3000); // Clear the status message after 3 seconds, close the modal, and reset the form
    }
  };
  return (
    <div className="App">
      <BackgroundAnimation />
      <header className="App-header">
        <h1>SentryCode</h1>
        <p>Redefining Global Security with Advanced Intelligence</p>
        <button className="App-cta" onClick={handleOpenModal}>
          Click to Connect
        </button>
      </header>
      <ContactModal
        show={showModal}
        onClose={handleCloseModal}
        onSend={handleSend}
        submissionStatus={submissionStatus}
      />
    </div>
  );
}

export default App;
