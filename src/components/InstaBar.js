import React from 'react';
import '../InstaBar.css';

export default class InstaBar extends React.Component {

  render () {
    return (
      <div className="Bar">
        <div className="centered">
          <div className="logo-wrapper">
            <a className="logo" href="/"></a>
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Search tags..."></input>
          </div>
          <div className="self-wrapper">
            <div><a href="/self" className="self"></a></div>
          </div>
        </div>
      </div>
    );
  }
}