import React from 'react';

const InputSection = ({ inputValue, setInputValue, handleMessageSend, handleKeyPress, handleNewChat }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Type your message here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleMessageSend}>Send</button>
      <button onClick={handleNewChat}>New Chat</button>
    </div>
  );
};

export default InputSection;
