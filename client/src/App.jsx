import './App.css';
import RightImage from './assets/3129492.jpg'

import DropFileInput from './components/drop-file-input/DropFileInput';
import Navbar from './components/Navbar/NavBar';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <>
            <Navbar />
            <div className='main-conatiner'>
                <div className='body-container'>
                    <div className="box">
                        <DropFileInput
                            onFileChange={(files) => onFileChange(files)}
                        />
                    </div>
                    <img src={RightImage} alt='right' style={{ width: 500 }} className='image-right' />
                </div>
                <About />
                <Footer />
            </div>
            
        </>
    );
}

export default App;
