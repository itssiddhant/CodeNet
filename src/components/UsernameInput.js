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
        className='text-black'
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
        <div className="github-profile card p-4 mt-4 text-black">
          <h3 className="text-xl font-bold mb-4 text-black">GitHub Profile</h3>
          <div className="grid grid-cols-2 gap-4">
          <div>
              <p className="font-semibold text-black">Username:</p>
              <p className="text-black">{profileData.github.login}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Public Repos:</p>
              <p className="text-black">{profileData.github.public_repos}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Followers:</p>
              <p className="text-black">{profileData.github.followers}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Following:</p>
              <p className="text-black">{profileData.github.following}</p>
            </div>
          </div>
          {profileData.github.bio && (
            <div className="mt-4">
              <p className="font-semibold text-black">Bio:</p>
              <p className="text-black">{profileData.github.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UsernameInput;