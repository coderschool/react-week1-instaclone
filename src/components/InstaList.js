import React from 'react';
import InstaPost from './InstaPost.js';
import logo from '../logo.svg';
import '../InstaList.css';

export default class InstaList extends React.Component {

  render() {
    console.log(this.props.posts);
    const postsData = this.props.posts || {data: []};

    const posts = postsData.data.map((post) => {
      const likePost = (e) => {
        this.props.likePost(post.id);
      }
      const unlikePost = (e) => {
        this.props.unlikePost(post.id);
      }
      return (
        <InstaPost
          token={this.props.token}
          key={post.id}
          unlikePost={unlikePost}
          likePost={likePost}
          {...post}
        />
      );
    });

    return (
      <main className="List-main">
        <section className="List-section">
          <img src={logo} 
               className="App-logo" 
               alt="logo"
               hidden={!this.props.loading}/>        
          {posts}
        </section>
      </main>
    )
  }

}