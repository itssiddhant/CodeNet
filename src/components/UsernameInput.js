import React, { useState } from 'react';
import { fetchLeetCodeData } from '../services/leetcodeService';
import { fetchGeeksForGeeksData } from '../services/gfgService';
import { fetchGitHubData } from '../services/githubService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function UsernameInput() {
  const [username, setUsername] = useState({ leetcode: '', gfg: '', github: '' });
  const [profileData, setProfileData] = useState({ leetcode: null, gfg: null, github: null });

  const handleChange = (e) => {
    setUsername({ ...username, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!username.leetcode && !username.gfg && !username.github) {
      alert('Please fill in at least one username field.');
      return;
    }

    const leetcodeProfile = username.leetcode ? await fetchLeetCodeData(username.leetcode) : null;
    const gfgProfile = username.gfg ? await fetchGeeksForGeeksData(username.gfg) : null;
    const githubProfile = username.github ? await fetchGitHubData(username.github) : null;
    
    setProfileData({ leetcode: leetcodeProfile, gfg: gfgProfile, github: githubProfile });
  };

  return (
    <div className="username-input">
      <h2>Enter Profile Usernames</h2>
      <input
        type="text"
        name="leetcode"
        value={username.leetcode}
        onChange={handleChange}
        placeholder="Enter your LeetCode username"
      />
      <input
        type="text"
        name="gfg"
        value={username.gfg}
        onChange={handleChange}
        placeholder="Enter your GFG username"
      />
      <input
        type="text"
        name="github"
        value={username.github}
        onChange={handleChange}
        placeholder="Enter your GitHub username"
      />
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        View Profile
      </button>

      {profileData.leetcode && (
        <div className="chart-container">
          <h3>LeetCode Profile of {username.leetcode}</h3>
          Total Problems Solved = {profileData.leetcode.totalSolved} / {profileData.leetcode.totalQuestions}
          <Pie
            data={{
              labels: ['Easy', 'Medium', 'Hard'],
              datasets: [
                {
                  data: [
                    profileData.leetcode.easySolved,
                    profileData.leetcode.mediumSolved,
                    profileData.leetcode.hardSolved,
                  ],
                  backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
            />
        </div>
      )}

      {profileData.gfg && (
        <div className="chart-container">
          <h3>GFG Profile</h3>
          <Pie
            data={{
              labels: ['School', 'Basic', 'Easy', 'Medium', 'Hard'],
              datasets: [
                {
                  data: [
                    profileData.gfg.School,
                    profileData.gfg.Basic,
                    profileData.gfg.Easy,
                    profileData.gfg.Medium,
                    profileData.gfg.Hard,
                  ],
                  backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#aa2203', '#ff0911'],
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
          <p>Total Problems Solved: {profileData.gfg.totalProblemsSolved}</p>
        </div>
      )}

      {profileData.github && (
        <div className="github-profile">
          <h3>GitHub Profile</h3>
          <p>Username: {profileData.github.login}</p>
          <p>Public Repos: {profileData.github.public_repos}</p>
          <p>Followers: {profileData.github.followers}</p>
          <p>Following: {profileData.github.following}</p>
          <p>Bio: {profileData.github.bio || 'N/A'}</p>
        </div>
      )}
      
    </div>
  );
}

export default UsernameInput;
