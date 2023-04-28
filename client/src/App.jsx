import React, { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import axios from "axios";
import Progress from "./components/Progress/Progress.jsx";

import "./app.scss";

export default function App() {
  const inputRef = useRef();
  const [filenames, setNames] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [fileLink, setFileLink] = useState(null);

  const fileHandler = (files) => {
    const extension = files[0].name.split(".")[1]?.toLowerCase();

    if (extension !== undefined) {
      const fNames = Object.keys(files).map((name) => {
        return {
          name: files[name].name,
          icon: files[name].name.split(".")[1]?.toUpperCase().trim()
        };
      });
      setNames((prev) => [...prev, fNames].flat());

      // Create a new FormData object
      const formData = new FormData();
      formData.append("file", files[0]);

      // Make an HTTP POST request to the backend API
      axios
        .post("https://qrush-backend.onrender.com/api/files/send", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          }
        })
        .then((response) => {
          setFileLink(response.data.file);
        })
        .catch((error) => {
          setUploadError(error.message);
        });
    } else {
      alert("file type not supported");
    }
  };

  const filePicker = () => {
    inputRef.current.click();
  };

  return (
    <div className="container">
      <h3>UPLOAD FILE</h3>
      <div className="progressContainer">
        {filenames &&
          filenames.map((file, i) => (
            <Progress key={i} name={file.name} icon={file.icon} />
          ))}
        {uploadProgress > 0 && (
          <Progress key="progress" name="Uploading..." progress={uploadProgress} />
        )}
        {uploadError && (
          <Progress key="error" name="Upload Error" progress={100} error={uploadError} />
        )}
        {fileLink && (
          <Progress key="link" name="File Link" progress={100} link={fileLink} />
        )}
      </div>
      <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
        <p className="placeholder">
          DRAG FILE HERE <br /> OR <span>BROWSE</span>
        </p>
        <input
          value=""
          style={{ visibility: "hidden", opacity: 0 }}
          ref={inputRef}
          multiple="multiple"
          type="file"
          onChange={(e) => fileHandler(e.target.files)}
        />
      </FileDrop>
    </div>
  );
}
