import { useState } from 'react';
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
      onVote();
    }
  };

  // Determine the visual state
  const showActiveStar = isActive; // Star shines if user voted for this idea
  const isButtonDisabled = disabled || isLocked; // Button is disabled if limit reached OR already voted

  return (
    <button
      className={`vote-button ${showActiveStar ? 'active' : ''} ${isButtonDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
      aria-label={showActiveStar ? activeText : text}
      disabled={isButtonDisabled}
      style={{ '--hue': '48deg' }}
    >
      <span className="button-text">{showActiveStar ? activeText : text}</span>
      <span
        className={`star-icon ${showActiveStar ? 'active' : ''}`}
        aria-hidden="true"
      >
        ⭐
      </span>
    </button>
  );
};

export default VoteButton;
