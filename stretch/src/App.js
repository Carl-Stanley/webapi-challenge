import React from 'react';
import './App.css';
import ProjectsList from './components/ProjectsList';
import ProjectsActionsList from './components/ProjectActionsList';
import { Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
            
      <Route path="/projectslist" component={ProjectsList} />
		  <Route path="projectsactionslist" component={ProjectsActionsList} />
    </div>
  );
}

export default App;
