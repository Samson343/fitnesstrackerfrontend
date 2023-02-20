import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import '@fontsource/roboto/400.css';

import Login from './components/Login';
import Register from './components/Register';
import { Header } from './components/Header';
import { NavHeader } from './components/NavHeader';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Activities from './components/Activities'
import Routines from './components/Routines'


function App() {
  const [token, setToken] = useState('')
  
  return (
    <Router>
      <div className='app'>

      <Route exact path = '/'>
        <NavHeader 
          token = {token}
          setToken = {setToken}
        />
        <Routines
          token = {token}    
        />
      </Route>

      <Route path = "/login">
        <Header/>
        <Login
          setToken = {setToken}
        />
      </Route>

      <Route path = "/register">
        <Header/>
        <Register
          setToken = {setToken}
        />
      </Route>

      <Route path = "/profile">
        <NavHeader 
          token = {token}
          setToken = {setToken}
          />
        <Profile
          token = {token}
        />
      </Route>

      <Route path = "/activities">
        <NavHeader
        token = {token}
        setToken = {setToken}
        />
        <Activities
            token={token}
          />
          <ActivityPost
            token={token}
          />
      </Route>

        <Footer />

      </div>

    </Router>
  );
}

export default App;
