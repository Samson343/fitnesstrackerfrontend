import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Register from './components/Login';
import { Header } from './components/Header';
import { NavHeader } from './components/NavHeader';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import Activities from './components/Activities';
import Routines from './components/Routines';
import RoutineActivities from './components/Routine_Activities';


function App() {
  const [token, setToken] = useState('')

  return (
    <Router>
      <div className="App">
        <Route path="/login">
          <Header />
          <Login
            setToken={setToken}
          />
        </Route>

        <Route path="/register">
          <Header />
          <Register
            setToken={setToken}
          />
        </Route>

        <Route exact path="/">
          <NavHeader />
          <Home
            token={token}
          />
        </Route>

        <Route path="/profile">
          <NavHeader />
          <Profile
            token={token}
          />
        </Route>

        <Route exact path="/activities">
          <NavHeader />
          <Activities
            token={token}
          />
        </Route>

        <Route path='/routines'>
          <NavHeader />
          <Routines
            token={token}
          />
        </Route>

        <Route path='/routine_activities'>
          <NavHeader />
          <RoutineActivities
            token={token}
          />
        </Route>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
