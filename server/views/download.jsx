import React from 'react'
import convertSize from "convert-size";

const download = ({ fileName, downloadLink, fileSize}) => {
  return (
    <div>
        <h1>Download Page</h1>
        <h4>{fileName}</h4>
        <h4>{convertSize(fileSize)}</h4>
        <button><a href={downloadLink}>Download File</a></button>
    </div>
  )
}

export default download