import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <h1 className="header">
        <img id="logoHeader" src="logo192.png" alt="React Logo"></img>
        <p>React Book Library</p>
      </h1>
    );
  }
}
