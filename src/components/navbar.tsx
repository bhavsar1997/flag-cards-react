import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class NavBar extends Component {

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <Link to="/" className="navbar-brand">Flag Cards</Link>
          <button className="btn btn-outline-success navbar form-inline my-2 my-sm-0" type="submit">                <Link to="/create" className="nav-link">Create Cards</Link></button>
        </nav>
      </>
    );
  }
}