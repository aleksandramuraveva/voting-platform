import Card from '../Card/Card';
import VoteButton from '../VoteButton/VoteButton';
import Loader from '../Loader/Loader';
import type { Idea } from '../../types';

import './index.css';


interface ListProps {
  ideas: Idea[];
  loading: boolean;
  error: string | null;
  votesUsed: number;                 
  maxVotes: number; 
  onVote: (isActive: boolean) => void;
}

const List: React.FC<ListProps> = ({ ideas, loading, error, onVote, votesUsed, maxVotes}) => {
  if (loading) {
    return (
      <div className="loader-container">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="ideas-list">
      {ideas.map((idea) => {
        const disabled = Boolean(idea.voted) || votesUsed >= maxVotes;
        return (
        <Card
          key={idea.id}
          title={idea.title}
          description={idea.description}
          votesCount={idea.votes}
          voted={idea.voted}
        >
          <VoteButton
             initialActive={idea.voted}
  onVote={() => onVote(idea.id)}
  disabled={votesUsed >= maxVotes}
          />
        </Card>
      );
      })}
    </div>
  );
};

export default List;