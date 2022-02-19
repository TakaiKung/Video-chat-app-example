import React, { useEffect } from 'react';
import IntroductionPage from './IntroductionPage/IntroductionPage';
import { connectWithSocketIOServer } from './utils/wss';


import './App.css';


function App() {

  useEffect(() => {
    connectWithSocketIOServer();
  },[]);

  return (
    <div className="App">
      <IntroductionPage />
    </div>
  );
}

export default App;
