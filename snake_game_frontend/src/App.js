import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Minimal placeholder GameBoard component.
 * This renders an empty grid canvas area (no game logic yet).
 */
function GameBoard({ size = 18 }) {
  // Create a simple square grid using CSS grid; no stateful logic yet.
  const cells = Array.from({ length: size * size }, (_, i) => i);
  return (
    <div
      className="game-board"
      role="grid"
      aria-label="Snake game board"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {cells.map((i) => (
        <div key={i} className="cell" role="gridcell" aria-hidden="true" />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | running | paused | gameover

  // Apply theme at the document level
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleStart = () => {
    setScore(0);
    setStatus('running');
  };

  // PUBLIC_INTERFACE
  const handlePause = () => {
    setStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setScore(0);
    setStatus('running');
  };

  return (
    <div className="App">
      <header className="page-header">
        <div className="container">
          <div className="header-row">
            <h1 className="title">Snake</h1>
            <button
              className="btn theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              type="button"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <div className="score-board" aria-live="polite">
            <span className="label">Score:</span>
            <span className="score">{score}</span>
            {status !== 'idle' && (
              <span className={`status ${status}`}>{status}</span>
            )}
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="container">
          <div className="board-wrapper">
            <GameBoard size={18} />
          </div>

          <div className="controls">
            <button
              className="btn btn-primary"
              onClick={handleStart}
              type="button"
            >
              {status === 'idle' ? 'Start' : 'Start'}
            </button>
            <button
              className="btn btn-outline"
              onClick={handleRestart}
              type="button"
            >
              Restart
            </button>
            <button
              className="btn btn-ghost"
              onClick={handlePause}
              type="button"
              disabled={status === 'idle'}
              aria-disabled={status === 'idle'}
            >
              {status === 'paused' ? 'Resume' : 'Pause'}
            </button>
          </div>

          <section className="instructions" aria-label="Controls and instructions">
            <h2 className="sr-only">How to play</h2>
            <p>
              Use arrow keys (← ↑ → ↓) or W/A/S/D to move the snake. Eat the red
              food, avoid walls and yourself. Try to achieve the highest score!
            </p>
            <p className="hint">Tip: On mobile, use on-screen controls (coming soon).</p>
          </section>
        </div>
      </main>

      <footer className="page-footer">
        <div className="container">
          <small className="muted">Modern, minimal UI • Light theme</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
