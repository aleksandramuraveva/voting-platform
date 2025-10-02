import './App.css';
// import type { } from "./types";
import VoteButton from './components/VoteButton/VoteButton';
import Card from './components/Card/Card';

function App() {
  const handleStarToggle = (isActive) => {
    console.log(`Star is ${isActive ? 'active' : 'inactive'}`);
  };
  return (
    <div className="app">
      {/* BG */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* MAIN */}
      <div className="content">
        <header className="header">
          <h1>Voting Platform</h1>
        </header>

        <main className="main-content">
          {/* List*/}
          <div className="ideas-list">
            <Card
              title="Название идеи"
              description="Описание идеи здесь здесь здесь здесь там"
              votesCount={5}
              voted={0}
            >
              <VoteButton
                text="Проголосовать"
                initialActive={false}
                onToggle={handleStarToggle}
                disabled={true}
              />
            </Card>
            <Card
              title="Название идеи"
              description="Описание идеи здесь здесь здесь здесь там"
              votesCount={5}
              voted={0}
            >
              <VoteButton
                text="Проголосовать"
                initialActive={false}
                onToggle={handleStarToggle}
                disabled={true}
              />
            </Card>
            <Card
              title="Название идеи"
              description="Описание идеи здесь здесь здесь здесь там"
              votesCount={5}
              voted={0}
            >
              <VoteButton
                text="Проголосовать"
                initialActive={false}
                onToggle={handleStarToggle}
                disabled={true}
              />
            </Card>
            <Card
              title="Название идеи"
              description="Описание идеи здесь здесь здесь здесь там"
              votesCount={5}
              voted={0}
            >
              <VoteButton
                text="Проголосовать"
                initialActive={false}
                onToggle={handleStarToggle}
                disabled={true}
              />
            </Card>
            <Card
              title="Название идеи"
              description="Описание идеи здесь здесь здесь здесь там"
              votesCount={5}
              voted={0}
            >
              <VoteButton
                text="Проголосовать"
                initialActive={false}
                onToggle={handleStarToggle}
                disabled={true}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
