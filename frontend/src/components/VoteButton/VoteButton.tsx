import React, { useState } from 'react';
import './index.css';

const VoteButton = ({
  text = 'Проголосовать',
  activeText = 'Голос засчитан',
  initialActive = false,
  disabled = false,
  onToggle,
}) => {
  const [isActive, setIsActive] = useState(initialActive);

  const handleClick = () => {
    if (disabled) return;

    const newActiveState = !isActive;
    setIsActive(newActiveState);

    if (onToggle) {
      onToggle(newActiveState);
    }
  };

  return (
    <button
      className={`vote-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      aria-label={isActive ? activeText : text}
      disabled={disabled}
      style={{ '--hue': '48deg' }}
    >
      <span className="button-text">{isActive ? activeText : text}</span>
      <span className="star-icon" aria-hidden="true">
        ⭐
      </span>
    </button>
  );
};

export default VoteButton;
