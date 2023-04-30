import React from 'react';
import './Footer.css'
import BlueHeart from '../../assets/sticky-notes.png'

function Footer() {
  return (
    <div className="footer">
      Built by Team Steve Jobs  
      <img src={BlueHeart} width={30}/>
    </div>
  );
}

export default Footer;
