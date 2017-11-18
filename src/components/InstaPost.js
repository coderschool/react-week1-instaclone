import React from 'react';
import '../css/InstaPost.css';
import InstaPostInteractions from './InstaPostInteractions.js';

const header = {
  height: "60px"
}

export default class InstaPost extends React.Component {

  render() {
    console.log(this.props);
    const location = this.props.location ? (<div className="location"><a href={`/location/${this.props.location.id}`}>{this.props.location.name}</a></div>) : null;
    return (
      <article className="Post">
        <header className="Post-header">
          <div className="Post-header-image">
            <img 
              className="Post-profile-image"
              src={this.props.user.profile_picture} 
              alt=""/>
          </div>
          <div className="Post-header-name">
            <div className="name">
              <a href={`/user/${this.props.user.id}`}>{this.props.user.username}</a>
            </div>            
            {location}
          </div>          
        </header>
        <div className="Post-image">
          <img 
            src={this.props.images.standard_resolution.url} 
            alt={this.props.caption.text}
          />
        </div>
        <InstaPostInteractions 
          {...this.props}
        />
      </article>
    )
  }

}