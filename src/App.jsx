import Context from "./context/Context";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const [result, setResult] = useState(''),
        [inputW, setInputW] = useState('');

  const sendRequest = data => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=60df5e7270cc2776cf325d165379b5b3`;
    fetch(url)
      .then(res => res.json())
      .then(resu => {
        if(!resu.main) return setResult(404)

        setResult(resu.main)
      })
      .catch(error => console.log(error));
  }
  return (
    <div className="bodyD">
      <Context.Provider value={{
        result, 
        setResult,
        inputW,
        setInputW,
        sendRequest
        }}>
        <div className="base container">
          <Header/>
          <Main/>
        </div>
        <footer className="footer">
          <div className='footer__details'>
            <a className="footer__tri" href="https://openweathermap.org/api" target='_blank'>Weather data provided by OpenWeatherMap</a>

            <div className="footer__xs">
              <a href="https://xspinoza.com" target='_blank'>By <span>xSpinoza</span></a>

              <a href="https://xspinoza.com" target='_blank'>
                <img src="/xsIcon.svg" alt="XS icon" />
              </a>
            </div>
          </div>

        </footer>
      </Context.Provider>

    </div>
  )
}

export default App