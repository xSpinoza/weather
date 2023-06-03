import { useState, useContext, useEffect } from "react";
import Context from "../context/Context";

const Header = () => {
  const { result, inputW, setInputW, sendRequest, setResult } = useContext(Context);

  const [Alert, setAlert] = useState(false);

  // Check for empty spaces
  function validateInput(input) {
    if (input.trim() === '') {
      return true;
    }
    return false;
  }

  const handleClick = () => {
    if(validateInput(inputW)) return setAlert(true);

    setResult('loading');
    setAlert(false);
    sendRequest(inputW.trim());
  }

  // Enter function
  useEffect(() => {
    const handleKeyPress = keyD => {
      if(keyD.key !== 'Enter') return;

      if(validateInput(inputW)) return setAlert(true);

      setResult('loading');
      setAlert(false);
      sendRequest(inputW.trim());
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputW]);

  useEffect(() => {
    if(result === 404) setAlert(true);
  }, [result])
  
  
  return (
    <header className="header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="header__icon"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={Alert ? "#ff3d00" : '#45A29E'}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="11" r="3" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
      </svg>

      <input 
        type="text" 
        className={`${Alert && 'alertError'} header__input`}
        placeholder="Orlando"
        onChange={e => setInputW(e.target.value)}
      />

      <svg
        onClick={() => handleClick()}
        xmlns="http://www.w3.org/2000/svg"
        className="header__icon header__icon--search"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#66FCF1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </header>
  )
}

export default Header