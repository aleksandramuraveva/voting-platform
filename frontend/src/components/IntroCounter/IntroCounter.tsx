import './index.css';

type Props = {
  votesUsed: number;
  maxVotes: number;
  description?: string;
};

const IntroCounter: React.FC<Props> = ({
  votesUsed,
  maxVotes,
  description,
}) => {
  const progress = Math.min(Math.max(votesUsed, 0), maxVotes);
  const isLimitReached = progress >= maxVotes;

  return (
    <section className="intro-counter" aria-labelledby="intro-title">
      <div className="intro-text">
        <h2 id="intro-title">Поддержи идеи — голосуй за лучшие</h2>
        <p className="intro-desc">
          {description ||
            'Просмотрите список идей ниже и проголосуйте за те, которые считаете наиболее полезными. С одного IP-адреса можно отдать до 10 голосов.'}
        </p>
      </div>

      <div className="counter-block" role="status" aria-live="polite">
        <div className="counter-line">
          <strong className="counter-value">{progress}</strong>
          <span className="counter-sep"> / </span>
          <span className="counter-max">{maxVotes}</span>
        </div>
        <div
          className={`counter-bar ${isLimitReached ? 'full' : ''}`}
          aria-hidden="true"
        >
          <div
            className="counter-fill"
            style={{ width: `${(progress / maxVotes) * 100}%` }}
          />
        </div>
        <div className="counter-note">
          {isLimitReached
            ? 'Лимит голосов достигнут'
            : 'Еще можно проголосовать'}
        </div>
      </div>
    </section>
  );
};

export default IntroCounter;
