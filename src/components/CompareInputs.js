import React, { useState } from 'react';
import { fetchLeetCodeData } from '../services/leetcodeService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function CompareInputs() {
  const [usernames, setUsernames] = useState({ leetcode1: '', leetcode2: '' });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setUsernames({ ...usernames, [e.target.name]: e.target.value });
  };

  const handleCompare = async () => {
    const profile1 = await fetchLeetCodeData(usernames.leetcode1);
    const profile2 = await fetchLeetCodeData(usernames.leetcode2);

    setData({
      datasets: [
        {
          label: usernames.leetcode1 || 'Profile 1',
          data: [profile1.easySolved, profile1.mediumSolved, profile1.hardSolved],
          backgroundColor: '#ff6384',
        },
        {
          label: usernames.leetcode2  || 'Profile 2',
          data: [profile2.easySolved, profile2.mediumSolved, profile2.hardSolved],
          backgroundColor: '#36a2eb',
          
        },
      ],
      labels: ['Easy', 'Medium', 'Hard'],
    });
  };

  return (
    <div className="compare-inputs">
      <h2>Compare LeetCode Profiles</h2>
      <div className="form-group">
        <label htmlFor="leetcode1">LeetCode Username 1:</label>
        <input
          type="text"
          id="leetcode1"
          name="leetcode1"
          value={usernames.leetcode1}
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="leetcode2">LeetCode Username 2:</label>
        <input
          type="text"
          id="leetcode2"
          name="leetcode2"
          value={usernames.leetcode2}
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleCompare}>
        Compare
      </button>

      {data && (
        <div className="chart-container">
          <Bar data={data} options={{ maintainAspectRatio: true }} />
        </div>
      )}
    </div>
  );
}

export default CompareInputs;
