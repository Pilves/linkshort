import React, { useState } from 'react';
import './App.css';


const bittoken = 'f34fc90dd5f84ce0dc08e2f09c91f77587f6dbc6';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [showCopy, setShowCopy] = useState(false);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };

  const shortenUrl = () => {
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bittoken}`,
        'Content-Type': 'application/json',
        "domain": "bit.ly", 
        "group_guid": "Ba1bc23dE4F" 
      },
      body: JSON.stringify({ long_url: inputValue })
    })
    .then(response => {
      if (!response.ok){
        console.error('Failed to shorten:', response.status, response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        setShortenedUrl(data.link);
        setShowCopy(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const pasteClipboard = () => {
    navigator.clipboard.readText()
    .then(text => setInputValue(text))
    .catch(errror => console.error(errror));
  };

  const copyClipboard = () => {
    const urlElement = document.getElementById('url');
    if (urlElement) {
      navigator.clipboard.writeText(urlElement.href)
      .then(() => {
        const copyButton = document.getElementById('copy');
        if (copyButton){
          copyButton.innerText = "Copied!";
        }
      })
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading'>Url Shortener</h1>
        <div className='input'>
          <input 
            type='url'
            value={inputValue}
            onChange={inputChange}
            placeholder='Enter URL to shorten'
          />
          <button onClick={pasteClipboard}>Paste</button>
          <button className='short' onClick={shortenUrl}>Shortify</button>
        </div>
        <div className='output'>
          {shortenedUrl && (
            <p>Shortened URL: <a href={shortenedUrl} id="url">{shortenedUrl}</a></p>
          )}
          {showCopy &&(
          <button classname="button" id="copy" onClick={copyClipboard}>
            Copy to clipboard
          </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
