import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [qr, setQr] = useState('');
  const [progress, setProgress] = useState(0);
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');

  const uploadNewFile = () => {
    setFile(null);
    setLink('');
    setQr('');
    setSenderEmail('');
    setReceiverEmail('');
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('myfile', file);

    axios.post('http://localhost:3000/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      })
      .then((response) => {
        let downloadLink = response.data.file;
        setLink(downloadLink);
        let qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(downloadLink)}&chs=150x150`;
        setQr(qrCodeUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSend = (event) => {
    event.preventDefault();
  
    const uuid = link.split('/').pop();
    const data = {
      uuid,
      emailFrom: senderEmail,
      emailTo: receiverEmail
    };
  
    axios
      .post(`http://localhost:3000/api/files/send`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          window.alert("Email sent successfully!");
          setSenderEmail('')
          setReceiverEmail('')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      {(!link && !qr) && (
        <div className="upload-area">
          <form onSubmit={handleSubmit}>
            <div className="file-drop-zone">
              <label htmlFor="file-input">
                <span className="file-label">Drag and drop your file here or </span>
                <span className="file-upload-button">choose a file</span>
              </label>
              <input id="file-input" type="file" onChange={handleFileInputChange} />
            </div>
            <button type="submit" className="upload-button">
              Upload
            </button>
          </form>
          {progress > 0 && (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>
      )}

      {(link && qr) && (
        <div className="file-details">
          <h4>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </h4>
          <img src={qr} alt="QR code" className="qr-code" />
          <form onSubmit={handleSend}>
            <div className="form-group">
              <label htmlFor="sender-email">Sender's Email:</label>
              <input
                id="sender-email"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="receiver-email">Receiver's Email:</label>
              <input
                id="receiver-email"
                type="email"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
              />
            </div>
            <button type="submit">Send</button>
          </form>
          <button className="upload-new-file-button" onClick={uploadNewFile}>
            Upload New File
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
