import React, { StrictMode } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, HashRouter} from 'react-router-dom';
import Selection from "./pages/Selection"
import NavBar from './components/NavBar/NavBar';
import SourceInterface2 from './components/SourceInterface/SourceInterface2';
 
function App() {

{
  //<div className="side" >
  //    <HashRouter>
  //    <Routes>
  //      <Route path="/" element={<Selection/>} />
      
  //    </Routes>
   // </HashRouter>
   //   </div>
}

  return (

    

    <div>
      <NavBar></NavBar>
      <SourceInterface2></SourceInterface2>
    </div>
  );
}

export default App;
