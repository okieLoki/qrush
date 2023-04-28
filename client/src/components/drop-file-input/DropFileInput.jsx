    import React, { useRef, useState } from "react";
    import axios from "axios";
    import copy from "copy-to-clipboard";
    import JSAlert from "js-alert";

    import "./drop-file-input.css";

    import { ImageConfig } from "../../config/ImageConfig";
    import uploadImg from "../../assets/cloud-upload-regular-240.png";

    const DropFileInput = (props) => {
    const wrapperRef = useRef(null);

    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [showLink, setShowLink] = useState(false);
    const [downloadLink, setDownloadLink] = useState("");
    const [qrCode, setqrCode] = useState("");

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
        JSAlert.alert("Link Copied to Clipboard");
    };

    const onFileSubmit = () => {
        const formData = new FormData();
        formData.append("myfile", file, "myfile");
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
            )}&chs=280x280`;
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
    };

    return (
        <>
        {!showLink && (
            <>
            <h2 className="header">Upload your file here </h2>
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
                <p>{file.size}B</p>
                </div>
                <span className="drop-file-preview__item__del" onClick={fileRemove}>
                x
                </span>
            </div>
            <div className="button-div">
                <button className="btn-blue" onClick={onFileSubmit}>
                Submit
                </button>
                {response ? (
                <p className="drop-file-response">{response.message}</p>
                ) : null}
            </div>
            </div>
        ) : null}
        {showLink && (
            <>
            <h3 className="header">File Uploaded successfully 🥳</h3>
            <div className="drop-file-link">
                <div>
                <div className="scrollable-div">
                    <p style={{margin: 0}}>{downloadLink}</p>
                </div>
                
                </div>

                <img src={qrCode} alt="QR Code" />
                <div className="btn-container">
                <button className="btn-blue" onClick={() => copyLink()}>
                    Copy
                </button>

                <button className="btn-blue" onClick={() => goBack()}>
                    Go Back
                </button>
                </div>
            </div>
            </>
        )}
        </>
    );
    };

    export default DropFileInput;
