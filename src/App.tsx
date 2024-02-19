import React from 'react';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import SourceInterface2 from './components/SourceInterface/SourceInterface2';
 
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="side" >
      <SourceInterface2></SourceInterface2>
      </div>
    </div>
  );
}

export default App;
