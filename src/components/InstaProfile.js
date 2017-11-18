import React from 'react';

export default class InstaProfile extends React.Component {
  render() {
    return (
      <div>
        <a href="#"><img src={this.props.profile_picture} /></a>
        <a href="#" onClick={this.props.openModalFollows}><p>Follows {this.props.counts.follows}</p></a>
        <a href="#" onClick={this.props.openModalFollowedBy}><p>Followed by {this.props.counts.followed_by}</p></a>
      </div>
    );
  }
}