import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar"
import ShowFlagCard from "./components/showFlagCard";
import EditFlagCard from "./components/editFlagCard";
import CreateFlagCard from "./components/createFlagCard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={ShowFlagCard} />
        <Route path="/edit/:id" component={EditFlagCard} />
        <Route path="/create" component={CreateFlagCard} />
      </div>
    </Router>
  );
}

export default App;
