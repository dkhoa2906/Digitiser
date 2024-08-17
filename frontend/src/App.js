import React, { } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminFolder from './pages/AdminFolder';
import ErrorPage from './pages/ErrorPage';
import CheckerPage from './pages/CheckerPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/AdminFolder' element={<AdminFolder />}/>
          <Route path='*' element={<ErrorPage />}/>
          <Route path='/CheckerPage' element={<CheckerPage />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
