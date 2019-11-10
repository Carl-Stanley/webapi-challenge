import React from 'react';
import './App.css';
import ProjectsList from './components/ProjectsList';
import ProjectActionsList from './components/ProjectActionsList';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
            
      <Route path="/projectslist" component={ProjectsList} />
		  <Route path="/projectactionslist" component={ProjectActionsList} />

    </div>
  );
}

export default App;
