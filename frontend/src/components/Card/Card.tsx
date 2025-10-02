import './index.css';

const Card = ({
  title,
  description,
  votesCount,
  voted,
  // onVote
  children,
}) => {
  return (
    <div className={`card ${voted ? 'card-voted' : ''}`}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-description">{description}</p>}

        <div className="card-footer">
          <div className="votes-count">
            <span className="votes-number">{votesCount}</span>
            <span className="votes-label">голосов</span>
          </div>

          <div className="card-actions">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
