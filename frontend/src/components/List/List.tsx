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
  onVote: (id: number) => void;
}

const List: React.FC<ListProps> = ({
  ideas,
  loading,
  error,
  onVote,
  votesUsed,
  maxVotes,
}) => {
  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="ideas-list">
      {ideas.map((idea) => {
        const disabled = idea.hasVoted || votesUsed >= maxVotes;

        return (
          <Card
            key={idea.id}
            title={idea.title}
            description={idea.description}
            votesCount={idea.votesCount}
            voted={idea.hasVoted}
          >
            <VoteButton
              initialActive={idea.hasVoted}
              onVote={() => onVote(idea.id)}
              disabled={disabled}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default List;
