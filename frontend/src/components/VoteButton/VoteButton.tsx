import React, { useState } from 'react';
import './index.css';

const VoteButton = ({
  text = 'Проголосовать',
  activeText = 'Голос засчитан',
  initialActive = false,
  disabled = false,
  onVote,
}) => {
  const [isActive, setIsActive] = useState(initialActive);
  const [isLocked, setIsLocked] = useState(initialActive);

  const handleClick = () => {
    if (disabled || isLocked) return;

    setIsActive(true);
    setIsLocked(true);

    if (onVote) {
      onVote(); // notify parent
    }
  };

  return (
    <button
      className={`vote-button ${isActive ? 'active' : ''} ${disabled || isLocked ? 'disabled' : ''}`}
      onClick={handleClick}
      aria-label={isActive ? activeText : text}
      disabled={disabled || isLocked}
      style={{ '--hue': '48deg' }}
    >
      <span className="button-text">{isActive ? activeText : text}</span>
      <span className="star-icon" aria-hidden="true">⭐</span>
    </button>
  );
};

export default VoteButton;
