import React, { useEffect } from 'react';
import GameContainer from './components/GameContainer'
import './App.css';
import Title from './components/Title'
import Menu from './components/Menu'
import HowToPlay from './components/HowToPlay';
import Leaderboard from './components/Leaderboard';
import { Route, Routes } from 'react-router-dom'

function App() {
  useEffect(() => {
    document.title = "Bombs";
  }, []);

  return (
    <div className='app'>
      <Title />
      <Menu />
      <Routes>
        <Route path="/" element={<GameContainer />} />
        <Route path="/howto" element={<HowToPlay />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
