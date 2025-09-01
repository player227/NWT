import React, { useEffect } from 'react';
import GameContainer from './components/GameContainer'
import './App.css';
import Title from './components/Title'
import Menu from './components/Menu'
import HowToPlay from './components/HowToPlay';
import Scoreboard from './components/Scoreboard';
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
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </div>
  );
}

export default App;
