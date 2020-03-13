import React, { useState, useEffect } from 'react';

// css
import './App.css';

// component
import Navbar from './components/navbar'
import { ToastContainer } from 'react-toastify'

//react router
import {Route} from 'react-router-dom'

// pages
import Homepage from './pages/homapage'
import Profilepage from './pages/profilepage'
import Signup from './pages/signup'
import Me from './pages/me'

function App() {

  return (
    <div className="App">

      <Route path='/' component={Navbar} />

      <ToastContainer />

      <Route exact path='/' component={Homepage} />
      
      <Route path="/home" component={Homepage} />

      <Route path='/signup' component={Signup} />

      <Route path='/me' component={Me} />

      <Route path='/profilepage/:id' component={Profilepage} />

    </div>
  );
}

export default App;
