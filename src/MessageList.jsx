import React, { useRef, useEffect } from "react";

const MessageList = ({ messages, loaded }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-list">
      {!loaded && <div className="message bot_response">Loading...</div>}
      {loaded &&
        messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {(message.text ? message.text : "").split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;
