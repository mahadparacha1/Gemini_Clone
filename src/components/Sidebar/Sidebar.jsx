import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ chatHistory }) => {
  const [extended, setExtended] = useState(false);

  return (
    <div className={`sidebar ${extended ? 'expanded' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recents</p>
            {chatHistory.length > 0 ? (
              chatHistory.map((entry, index) => (
                <div key={index} className="recent-entry">
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>
                    {entry.message.length > 20
                      ? `${entry.message.slice(0, 20)}...`
                      : entry.message}
                  </p>
                </div>
              ))
            ) : (
              <p>No recent chats</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
