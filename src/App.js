import React, { useState } from 'react';
import { Code2, Users, ChevronDown } from 'lucide-react';
import UsernameInput from './components/UsernameInput';
import CompareInputs from './components/CompareInputs';
import './App.css';

function App() {
  const [mode, setMode] = useState('personal');
  const [showFeatures, setShowFeatures] = useState(false);

  const GithubIcon = () => (
    <svg height="24" width="24" viewBox="0 0 16 16" version="1.1">
      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="currentColor"/>
    </svg>
  );

  const features = [
    {
      title: "Profile Analysis",
      description: "Get detailed insights into your coding patterns and progress",
      icon: <Code2 size={24} />
    },
    {
      title: "Cross-Platform Comparison",
      description: "Compare metrics across LeetCode, GeeksforGeeks, and GitHub",
      icon: <GithubIcon size={24} />
    },
    {
      title: "Community Insights",
      description: "See how you stack up against the coding community",
      icon: <Users size={24} />
    }
  ];

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <button 
            onClick={() => setMode('personal')}
            className={`nav-button ${mode === 'personal' ? 'active' : ''}`}
          >
            Personal Profile
          </button>
          
          <h1 className="app-title">CodeNet</h1>
          
          <button 
            onClick={() => setMode('compare')}
            className={`nav-button ${mode === 'compare' ? 'active' : ''}`}
          >
            Compare Profiles
          </button>
        </div>
      </nav>

      <main className="main">
        <section className="hero">
          <h2 className="hero-title">
            Your Coding Journey, Unified
          </h2>
          <p className="hero-subtitle">
            Track and analyze your progress across multiple coding platforms in one place
          </p>
        </section>

        <div className="card">
          <div className="card-content">
            <div className="card-header">
              <h2 className="card-title">About CodeNet</h2>
              <button 
                onClick={() => setShowFeatures(!showFeatures)}
                className="toggle-button"
              >
                {showFeatures ? 'Show Less' : 'Learn More'}
                <ChevronDown 
                  size={16}
                  style={{ 
                    transform: showFeatures ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
            </div>
            
            <p>
              CodeNet helps you track and analyze your coding journey across multiple platforms,
              providing valuable insights into your progress and areas for improvement.
            </p>

            {showFeatures && (
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="alert">
          <p className="alert-description">
            👋 New to CodeNet? Start by entering your usernames from different coding platforms below!
          </p>
        </div>

        <div className="content-section">
          {mode === 'personal' && <UsernameInput />}
          {mode === 'compare' && <CompareInputs />}
        </div>
      </main>
    </div>
  );
}

export default App;