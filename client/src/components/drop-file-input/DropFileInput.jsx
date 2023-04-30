import React, { useRef, useState } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import bytes from "bytes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import Loading from "../../assets/loading.gif";
import Email from '../Email/Email'

import "./drop-file-input.css";

import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";
// import uploadImg from '../../assets/dribbble_1.gif'

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [showLink, setShowLink] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [qrCode, setqrCode] = useState("");
  const [submitButtontext, setsubmitButtontext] = useState("Submit ");
  const [showLoading, setshowLoading] = useState(false);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      props.onFileChange([newFile]);
    }
  };

  const fileRemove = () => {
    setFile(null);
    setResponse(null);
    setShowLink(false);
    props.onFileChange([]);
  };

  const copyLink = () => {
    copy(downloadLink);
    toast.info("Link Copied to Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onFileSubmit = () => {
    setshowLoading(true);
    setsubmitButtontext("Uploading  ");
    const formData = new FormData();
    formData.append("myfile", file);
    axios
      .post("https://qrush-backend.onrender.com/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setResponse(response.data);
        setDownloadLink(response.data.file);
        let qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
          response.data.file
        )}&chs=240x240`;
        setqrCode(qrCodeUrl);
        setShowLink(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goBack = () => {
    setFile(null);
    setResponse(null);
    setShowLink(false);
    setshowLoading(false);
    setsubmitButtontext("Submit");
  };

  return (
    <div className="upload">
      {!showLink && (
        <>
          <h2 className="header-heading">Upload your file here </h2>
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" value="" onChange={onFileDrop} />
          </div>
        </>
      )}
      {file && !showLink ? (
        <div className="drop-file-preview">
          <div key={0} className="drop-file-preview__item">
            <img
              src={
                ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]
              }
              alt=""
            />
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{bytes(file.size)}</p>
            </div>
            <span className="drop-file-preview__item__del" onClick={fileRemove}>
              <RxCross2 />
            </span>
          </div>
          <div className="button-div">
            <button className="btn-blue" onClick={onFileSubmit}>
              <div>
                {submitButtontext}
                {showLoading ? (
                  <img src={Loading} style={{ width: 19 }} className="load"/>
                ) : (
                  <></>
                )}
              </div>
            </button>
            {response ? (
              <p className="drop-file-response">{response.message}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {showLink && (
        <>
          {/* <h3 className="header">File Uploaded successfully 🥳</h3> */}
          <div className="drop-file-link">
            <div className="file-name-size">
              <div>
                <p className="filehead">{file.name}</p>
                <p className="filesize">{bytes(file.size)}</p>
              </div>
              <RxCross2 onClick={() => goBack()} />
            </div>

            <div>
              <div className="scrollable-div" onClick={() => copyLink()}>
                <p>{downloadLink}</p>
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </div>
            </div>
          

          <img src={qrCode} alt="QR Code" />
          

          {/* EMAIL */}
          <Email downloadLink={downloadLink}/>
          </div>
        </>
      )}
    </div>
  );
};

export default DropFileInput;
