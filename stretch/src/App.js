import React from 'react';
import './App.css';
import ProjectsList from './components/ProjectsList';

import { Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
            
      <Route path="/projectslist" component={ProjectsList} />
		
    </div>
  );
}

export default App;
