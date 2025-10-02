import {useState, useEffect} from 'react';
import './App.css';
// import type { } from "./types";
// import VoteButton from './components/VoteButton/VoteButton';
// import Card from './components/Card/Card';
// import Loader from './components/Loader/Loader';
import List from './components/List/List';
import IntroCounter from './components/IntroCounter/IntroCounter'
import { getIdeas } from "./services/api";

function App() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_VOTES = 10;

  const votesUsed = ideas.reduce((acc, it) => (it.voted ? acc + 1 : acc), 0);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        setLoading(true);
        setError(null);
        const data = await getIdeas();
        setIdeas(data);
        console.log('ideas', data)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);


  const handleVote = (id: string) => {
  setIdeas(prev =>
    prev.map(it =>
      it.id === id ? { ...it, voted: true } : it
    )
  );
};
  return (
    <div className="app">
      {/* BG */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* MAIN */}
      <div className="content">
      

        <main className="main-content">
         <header className="header">
          <h1>Voting Platform</h1>
        </header>
         <IntroCounter votesUsed={votesUsed} maxVotes={MAX_VOTES} />
              <List 
            ideas={ideas}
            loading={loading}
            error={error}
            onVote={handleVote}
  votesUsed={votesUsed}
            maxVotes={MAX_VOTES}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
