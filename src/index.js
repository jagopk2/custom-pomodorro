import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router components
import App from './App';
import reportWebVitals from './reportWebVitals';
import SettingsPage from './components/Settings';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
