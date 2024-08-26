import React, { useState } from 'react';
import UsernameInput from './components/UsernameInput';
import CompareInputs from './components/CompareInputs';
import './App.css'

function App() {
  const [mode, setMode] = useState('personal'); // 'personal' or 'compare'

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="App">
      <nav>
        <button className="btn btn-secondary" onClick={() => handleModeSwitch('personal')}>
          Personal Profile View
        </button>
        <h1>Welcome to CodeNet !</h1>
        <button className="btn btn-secondary" onClick={() => handleModeSwitch('compare')}>
          Compare Profiles
        </button>
      </nav>
      
      <main>
      <section id="about">
          <div className="aboutme">
            <h2>About the Project</h2>
            <p>
              Welcome to CodeNet, an application designed to help you easily compare your coding profiles across different platforms. Whether you're a LeetCode enthusiast, a GeeksforGeeks aficionado, or a GitHub contributor, our app allows you to view and analyze your performance metrics side by side.
            </p>
            <p>
              With CodeNet, you can enter your usernames from LeetCode, GeeksforGeeks, and GitHub to get a comprehensive overview of your problem-solving skills, track your progress, and see how you stack up against others. Our intuitive interface provides clear visualizations and detailed information to help you understand your strengths and areas for improvement.
            </p>
            <p>
              Start by entering your usernames and explore your coding journey with ease!
            </p>
          </div>
        </section>
        {mode === 'personal' && <UsernameInput />}
        {mode === 'compare' && <CompareInputs />}
      </main>
    </div>
  );
}

export default App;
