import { useState, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import type { Idea } from './types';

import List from './components/List/List';
import IntroCounter from './components/IntroCounter/IntroCounter';
import { getIdeas, voteForIdea } from './services/api';

import { useToast } from './hooks/useToast';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError, showSuccess } = useToast();
  const MAX_VOTES = 10;

  const votesUsed = useMemo(
    () => ideas.reduce((acc, idea) => (idea.hasVoted ? acc + 1 : acc), 0),
    [ideas],
  );
  const sortedIdeas = useMemo(
    () => [...ideas].sort((a, b) => b.votesCount - a.votesCount),
    [ideas],
  );

  useEffect(() => {
    async function fetchIdeas() {
      try {
        setLoading(true);
        setError(null);
        const data = await getIdeas();
        setIdeas(data);
      } catch (err: unknown) {
        const message = err?.message || 'Unknown error';
        setError(message);
        showError(`Ошибка загрузки: ${message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, [showError]);

  const handleVote = async (id: number) => {
    const idea = ideas.find((it) => it.id === id);
    if (idea?.hasVoted) {
      showError('Вы уже проголосовали за эту идею!');
      return;
    }

    if (votesUsed >= MAX_VOTES) {
      showError('Вы исчерпали свой лимит голосов!');
      return;
    }

    // Optimistic update
    setIdeas((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, hasVoted: true, votesCount: it.votesCount + 1 }
          : it,
      ),
    );

    try {
      const res = await voteForIdea(id);
      setIdeas((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, votesCount: res.votesCount } : it,
        ),
      );
      showSuccess('Голос учтен!');
    } catch (err: unknown) {
      setIdeas((prev) =>
        prev.map((it) =>
          it.id === id
            ? { ...it, hasVoted: false, votesCount: it.votesCount - 1 }
            : it,
        ),
      );

      const message = err?.message || 'Unknown error';
      showError(message);
    }
  };
  return (
    <div className="app">
      <Toaster
        toastOptions={{
          className: 'custom-toast',
          duration: 4000,
        }}
      />
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
            ideas={sortedIdeas}
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
