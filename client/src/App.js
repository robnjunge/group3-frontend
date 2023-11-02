import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

function App() {
  const [setLoginFormVisible] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const handleLoginClick = () => {
    setLoginFormVisible(true);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:5555/')
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          setFetchedData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    fetchData();
  }, []); 

  return (
    <Router>
      <div>
        <Navbar onLoginClick={handleLoginClick} />
        {fetchedData && (
          <div>
            <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
