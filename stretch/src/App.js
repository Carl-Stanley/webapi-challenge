import React from 'react';
import './App.css';
import ProjectsList from './components/ProjectsList';
import ProjectActionsList from './components/ProjectActionsList';
import { Route } from "react-router-dom";
import TheHeader from './components/Header';

function App() {
  return (
    <div className="App">
      <TheHeader />         
      <Route exact path="/" component={ProjectsList} />
		  <Route path="/projectactionslist/:project_id" component={ProjectActionsList} />

    </div>
  );
}

export default App;
