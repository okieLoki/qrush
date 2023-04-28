import React, { useState } from 'react';

const Form = ({ downloadLink }) => {
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uuid = downloadLink.substring(downloadLink.lastIndexOf('/') + 1);

    const data = {
      uuid: uuid,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    };

    try {
      const response = await fetch('https://qrush-backend.onrender.com/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Success');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="senderEmail">Sender Email:</label>
        <input
          type="email"
          id="senderEmail"
          value={senderEmail}
          onChange={(event) => setSenderEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="receiverEmail">Receiver Email:</label>
        <input
          type="email"
          id="receiverEmail"
          value={receiverEmail}
          onChange={(event) => setReceiverEmail(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
