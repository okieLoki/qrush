import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './email.css'

const Email = ({ downloadLink }) => {
  const [emailTo, setEmailTo] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [buttonText, setButtonText] = useState("Send Email")

  const validateEmail = (email) => {
    // regex pattern for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(emailTo) || !validateEmail(emailFrom)) {
      toast.error("Please enter valid email addresses", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setButtonText('Sending...')
    const uuid = downloadLink.split("/").pop();
    const data = { uuid, emailTo, emailFrom };
    try {
      const response = await axios.post(
        "https://qrush-backend.onrender.com/api/files/send",
        data
      );
      if (response.data.success) {
        toast.info("Email sent successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setButtonText('Send Email')
      }
      else{
        toast.info("Email already sent", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setButtonText('Send Email')
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          className="css-input"
          type="email"
          placeholder="Sender"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
      </label>
      <br />
      <label>
        <input
          className="css-input"
          type="email"
          placeholder="Receiver"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn-blue">{buttonText}</button>
    </form>

  );
};

export default Email;
