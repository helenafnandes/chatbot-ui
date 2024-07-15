import React from 'react';

const SuggestionSection = ({ suggestions, handleSuggestion }) => {
  return (
    <div className="suggestions-container">
      <div className="suggestions-title">SUGGESTIONS</div>
      <div className="suggestions-buttons">
        {suggestions.map((suggestion, index) => (
          <button key={index} onClick={() => handleSuggestion(suggestion)}>{suggestion}</button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionSection;
