import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MessageList from "./MessageList";
import InputSection from "./InputSection";
import SuggestionSection from "./SuggestionSection";

const API_BASE_URL = process.env.REACT_APP_CHATBOT_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL); // Add this line

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("Loading...");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "Bakery Bot";
    fetchWelcomeMessage();
  }, []);

  const suggestions = [
    "Hello there!",
    "What's on the menu?",
    "I want to order a cake",
    "whats youre addres",
    "Tell me a joke",
    "I don't like bots",
  ];

  const fetchWelcomeMessage = () => {
    axios
      .get(`${API_BASE_URL}/api/welcome_message`)
      .then((response) => {
        setWelcomeMessage(response.data.message);
        setMessages([{ text: response.data.message, sender: "bot_response" }]);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // Retry after 3 seconds
        setTimeout(fetchWelcomeMessage, 3000);
      });
  };

  const handleMessageSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    axios
      .post(`${API_BASE_URL}/api/chatbot`, { message: inputValue })
      .then((response) => {
        const botAnalysisMessage = {
          text: `Spell check: ${response.data.corrected_message}\nSentiment: ${response.data.sentiment}`,
          sender: "bot_analysis",
        };
        const botResponseMessage = {
          text: response.data.response,
          sender: "bot_response",
        };

        setMessages((prevMessages) => [
          ...prevMessages,
          botAnalysisMessage,
          botResponseMessage,
        ]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setInputValue("");
  };

  /*
  const handleMessageSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    axios
      .get(`${API_BASE_URL}/api/chatbot`, { params: { message: inputValue } })
      .then((response) => {
        const botAnalysisMessage = {
          text: `Spell check: ${response.data.corrected_message}\nSentiment: ${response.data.sentiment}`,
          sender: "bot_analysis",
        };
        const botResponseMessage = {
          text: response.data.response,
          sender: "bot_response",
        };

        setMessages((prevMessages) => [
          ...prevMessages,
          botAnalysisMessage,
          botResponseMessage,
        ]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setInputValue("");
  };*/

  const handleSuggestion = (suggestionText) => {
    setInputValue(suggestionText);
  };

  const handleNewChat = () => {
    setMessages([]);
    setLoaded(false);
    fetchWelcomeMessage();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} loaded={loaded} />
      <InputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleMessageSend={handleMessageSend}
        handleKeyPress={handleKeyPress}
        handleNewChat={handleNewChat}
      />
      <SuggestionSection
        suggestions={suggestions}
        handleSuggestion={handleSuggestion}
      />
      <div className="watermark">
        <a
          href="https://github.com/helenafnandes/mood-analyzer-chatbot"
          target="_blank"
        >
          Chatbot Project by Helena Ferreira Fernandes - View on GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
