import React from 'react';
import InstaPost from './InstaPost.js';
import logo from '../logo.svg';

export default class InstaList extends React.Component {

  render() {
    const postsData = this.props.posts || {data: []};

    console.log(postsData);

    const posts = postsData.data.map((post) => {
      return (
        <InstaPost
          key={post.id}
          alt={post.caption.text}
          img={post.images.standard_resolution.url} />
      );
    });

    return (
      <div>
        <img src={logo} 
             className="App-logo" 
             alt="logo"
             hidden={!this.props.loading}/>
        {posts}
      </div>
    )
  }

}