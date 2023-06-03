import { useState, useEffect, useContext} from "react";
import Context from "../context/Context";
import tempFun from "../helpers/temp";

const Main = () => {
  const { result, setResult } = useContext(Context);

  const [degrees, setDegrees] = useState('f'),
        [isOn, setIsOn] = useState(true);

  const [isChange, setIsChange] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsChange(screenWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const transform = () => {
    setIsOn(!isOn);
    if(isOn) setDegrees('c')
    else setDegrees('f');

    const btn = document.getElementById('btn');
    btn.classList.toggle('transform');
    
    // Animation
    btn.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ], {
      duration: 500,
      easing: 'ease-in-out'
    });
  }
  
  return (
    <main className="main">

      {typeof result === 'object' ? (
        <>
          <style>
            {`
              .main__result::after {
                content: url('/${degrees}Icon.svg');
              }
            `}
          </style>

          <h1 className="main__result">
            {tempFun(result.temp, degrees)}
          </h1>

          <div className="main__info">
            <div className="main__box">
                {isChange ?            
                  <div className="main__details">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        fill="none"
                        stroke="#66FCF1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="icon icon-tabler icon-tabler-temperature"
                        viewBox="0 0 24 24"
                        >
                        <path stroke="none" d="M0 0h24v24H0z"></path>
                        <path d="M10 13.5a4 4 0 104 0V5a2 2 0 00-4 0v8.5"></path>
                        <path d="M10 9L14 9"></path>
                      </svg>
                    </div>
                    <div className="main__subDetails">                
                      <p className="main__text">{tempFun(result.feels_like, degrees)}</p>
                      <h3 className="main__title">Feels like</h3>
                    </div>
                  </div>
                  :
                  <>
                    <div className="main__details">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        fill="none"
                        stroke="#66FCF1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="icon icon-tabler icon-tabler-temperature"
                        viewBox="0 0 24 24"
                        >
                        <path stroke="none" d="M0 0h24v24H0z"></path>
                        <path d="M10 13.5a4 4 0 104 0V5a2 2 0 00-4 0v8.5"></path>
                        <path d="M10 9L14 9"></path>
                      </svg>

                      <p className="main__text">{tempFun(result.feels_like, degrees)}</p>
                    </div>
                    <h3 className="main__title">Feels like</h3>
                  </>
                }
              </div>

            <div className="main__box">
              {isChange ?            
                <div className="main__details">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      fill="none"
                      stroke="#66FCF1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="icon icon-tabler icon-tabler-mist"
                      viewBox="0 0 24 24"
                      >
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <path d="M5 5h3m4 0h9M3 10h11m4 0h1M5 15h5m4 0h7M3 20h9m4 0h3"></path>
                    </svg>
                  </div>
                  <div className="main__subDetails">                
                    <p className="main__text">{result.humidity}%</p>
                    <h3 className="main__title">Humidity</h3>
                  </div>
                </div>
                :
                <>
                  <div className="main__details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      fill="none"
                      stroke="#66FCF1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="icon icon-tabler icon-tabler-mist"
                      viewBox="0 0 24 24"
                      >
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <path d="M5 5h3m4 0h9M3 10h11m4 0h1M5 15h5m4 0h7M3 20h9m4 0h3"></path>
                    </svg>

                    <p className="main__text">{result.humidity}%</p>
                  </div>
                  <h3 className="main__title">Humidity</h3>
                </>
              }
            </div>
          </div>
          <button id="btn" onClick={() => transform()}>
      
            <span className="letter">℃</span>
            <span className="letter-transform">°F</span>
          </button>
        </>
        
      ) : result === 404 ? (

        <h3 className="main__intro">
          We couldn't find that <span className="nf">city</span>. Please try again with a different city name.
        </h3>

      ) : result === 'loading' ? (
        <span className="loader"></span>

      ) : (
        <h3 className="main__intro">
          Enter a <span>city</span> to check its current weather conditions
        </h3>
      )}
    </main>
  )
}

export default Main