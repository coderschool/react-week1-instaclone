import React from 'react';
import '../css/InstaProfile.css';

export default class InstaProfile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <article>
          <header>
            <div className="image">
              <a href="#"><img src={this.props.profile_picture} /></a>
            </div>
            <div>
              <div className="name">
                <h1>{this.props.username}</h1>
              </div>
              <div className="counts">
                <ul>
                  <li><span>{this.props.counts.media}</span> posts</li>
                  <li><a href="#" onClick={this.props.openModalFollowedBy}><span>{this.props.counts.followed_by}</span> followers</a></li>
                  <li><a href="#" onClick={this.props.openModalFollows}><span>{this.props.counts.follows}</span> following</a></li>
                </ul>
              </div>
              <div className="fullname">
                <p>{this.props.full_name}</p>
              </div>
            </div>
          </header>
        </article>
      </div>
    );
  }
}