import React from 'react'
import convertSize from "convert-size";

const download = ({ fileName, downloadLink, fileSize}) => {
  return (
    <div style={{ backgroundColor: '#e1e8f0', padding: '20px' }}>
        <h1 style={{ color: '#3c4858', textAlign: 'center' }}>Download Page</h1>
        <h4 style={{ color: '#3c4858', margin: '0 0 10px 0' }}>{fileName}</h4>
        <h4 style={{ color: '#3c4858', margin: '0 0 10px 0' }}>{convertSize(fileSize)}</h4>
        <button style={{ backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', marginTop: '20px' }}>
          <a href={downloadLink} style={{ color: '#fff', textDecoration: 'none' }}>Download File</a>
        </button>
    </div>
  )
}

export default download