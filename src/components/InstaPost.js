import React from 'react';

export default class InstaPost extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.img} 
             alt={this.props.alt}
             key={this.props.key}
        />
      </div>
    )
  }

}