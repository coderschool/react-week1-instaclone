import React from 'react';
import '../InstaPost.css';

const header = {
  height: "60px"
}

export default class InstaPost extends React.Component {

  render() {
    console.log(this.props);
    const location = this.props.location ? (<div>{this.props.location.name}</div>) : null;
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
            <div>
              {this.props.user.username}
            </div>
            {location}
          </div>          
        </header>
        <img 
          src={this.props.images.standard_resolution.url} 
          alt={this.props.caption.text}
        />
      </article>
    )
  }

}