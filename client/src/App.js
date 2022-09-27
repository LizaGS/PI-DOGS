import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import AboutMe from './components/AboutMe/AboutMe';
import Form from './components/Form/Form';
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/dogs/:id' component={DogDetail} />
        <Route path='/about' component={AboutMe}/>
        <Route path='/form' component={Form}/>
      </div>
    </React.Fragment>
  );
};

export default App;
