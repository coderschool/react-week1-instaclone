import React from 'react';
import logo from '../logo.svg';

export default class InstaFollow extends React.Component {
  render() {
    const followedBy = this.props.friends && this.props.friends.map((friend) => {
      return (
        <div className="Post-header">
          <div className="Post-header-image">
            <img 
              className="Post-profile-image"
              src={friend.profile_picture} 
              alt=""/>
          </div>
          <div className="Post-header-name">
            <div className="name">
              <a href={`/user/${friend.id}`}>{friend.username}</a>
            </div>
            <div className="location">
              {friend.full_name}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <img src={logo} 
             className="App-logo" 
             alt="logo"
             hidden={!this.props.loading}/>
        {followedBy}             
      </div>
    );
  }
}
