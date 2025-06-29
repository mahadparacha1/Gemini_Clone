import React, { useState, useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent } = useContext(Context);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      message: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prev) => [...prev, userMessage]);

    const result = await onSent(input);
    const geminiMessage = {
      sender: 'gemini',
      message: result,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prev) => [...prev, geminiMessage]);
    setInput('');
  };

  return (
    <div className="main">
      {/* Navigation Bar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.my_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {/* Greeting Section */}
        {!chatHistory.length && (
          <div className="greet">
            <p>
              <span>Hello, Mahad</span>
            </p>
            <p>How can I help you today?</p>
          </div>
        )}

        {/* Cards Section */}
        {!chatHistory.length && (
          <div className="cards">
            <div className="card">
              <p>Suggest Beautiful Places in Pakistan</p>
              <img src={assets.compass_icon} alt="Compass Icon" />
            </div>
            <div className="card">
              <p>My Name is Mahad Paracha</p>
              <img src={assets.bulb_icon} alt="Bulb Icon" />
            </div>
            <div className="card">
              <p>I am from Pakistan</p>
              <img src={assets.message_icon} alt="Message Icon" />
            </div>
            <div className="card">
              <p>Suggest Beautiful Places like Naran</p>
              <img src={assets.code_icon} alt="Code Icon" />
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="chat-area">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-row">
              <img
                src={
                  chat.sender === 'user'
                    ? assets.my_icon
                    : assets.gemini_icon
                }
                alt={`${chat.sender} icon`}
                className="profile-icon"
              />
              <div className={`chat-bubble ${chat.sender}-bubble`}>
                <p>{chat.message}</p>
                <span className="timestamp">{chat.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div onClick={handleSend} style={{ cursor: 'pointer' }}>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>
          <p className="bottom-info">Gemini may generate inaccurate info.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
