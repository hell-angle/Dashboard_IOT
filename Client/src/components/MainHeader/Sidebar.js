import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router
import '.././../styles/sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/user/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/user/main">Main</Link>
        </li>
        <li>
          <Link to="/user/charts">Charts</Link>
        </li>
        <li>
          <Link to="/user/logs">Logs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
