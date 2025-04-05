import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [quiz, setQuiz] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // To track sidebar open/close state

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/tutor/', {
        question: question,
        user_id: 'user123',
      });

      setAnswer(response.data.answer);
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const generateQuiz = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/quiz/', {
        topic: question || 'general',
      });
      setQuiz(response.data.quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend/', {
        history: [question],
      });
  
      const recs = response.data.recommendations;
  
      if (Array.isArray(recs)) {
        setRecommendations(recs);
      } else if (typeof recs === 'string') {
        setRecommendations([recs]); // wrap single string as array
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations([]);
    }
  };
  

  const logout = () => {
    setUserLoggedIn(false);
  };

  const signIn = () => {
    setUserLoggedIn(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!userLoggedIn) {
    return (
      <div className="auth-page">
        <h1>Welcome!</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <div className="auth-buttons">
          <button className="auth-btn" onClick={signIn}>Sign In</button>
          <button className="auth-btn" onClick={signIn}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Collapsible Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="pencil-icon">✏️</span>
      </button>

      {/* Left Sidebar for Buttons */}
      {sidebarOpen && (
        <div className="left-side">
          <button onClick={generateQuiz}>Quiz</button>
          <button onClick={getRecommendations}>Rec</button>
        </div>
      )}

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
        <h1>Your AI Tutor</h1>

        {/* Ask Question */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
        />
        <button onClick={handleQuestionSubmit}>Ask</button>

        {/* Display Answer */}
        <div className="response-box">
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>

        {/* Display Quiz */}
        <h2>Quiz:</h2>
        <pre>{quiz}</pre>

        {/* Display Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendation-box">
            <h2>Recommendations:</h2>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default App;
