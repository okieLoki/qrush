import React from 'react'
import './About.css'
import Fast from '../../assets/fast.png'
import Secure from '../../assets/secure.png'
import Encryption from '../../assets/encryption.png'
import UserFrnd from '../../assets/userfrnd.png'

const About = () => {

    return (
        <div className='about'>
            <div className='container'>
                {/* Left */}
                <div className='left'>
                    <h2>What is QRush?</h2>
                    <p>
                    Effortlessly share large files securely with Qrush. Upload up to 100mb and get a shareable link and QR code that lasts 5 hours. Simplify file sharing today.
                    </p>
                </div>

                {/* Right */}

                <div className='right'>
                    <div className='card'>
                        <div className='top'>
                            <img src={Fast}/>
                        </div>
                        <div>
                            <h5>Faster</h5>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='top'>
                            <img src={Secure}/>

                        </div>
                        <div>
                            <h5>Secure</h5>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='top'>
                            <img src={Encryption}/>
                        </div>
                        <div>
                            <h5>Encrypted</h5>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='top'>
                            <img src={UserFrnd}/>
                        </div>
                        <div>
                            <h5>User Friendly</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About