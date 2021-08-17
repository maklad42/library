import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>
          Created with{' '}
          <img id="footerLogo" src="logo192.png" alt="React logo"></img> by:
          maklad42 with the help of Pawel Kowalewski
          <br />
          ©️ All rights reserved
        </p>
      </footer>
    );
  }
}
