import React from 'react';
import InstaPost from './InstaPost.js';
import logo from '../logo.svg';
import '../InstaList.css';

export default class InstaList extends React.Component {

  render() {
    const postsData = this.props.posts || {data: []};

    const posts = postsData.data.map((post) => {
      return (
        <InstaPost
          key={post.id}
          {...post}
        />
      );
    });

    return (
      <main className="List-main">
        <img src={logo} 
             className="App-logo" 
             alt="logo"
             hidden={!this.props.loading}/>

        <section className="List-section">
          {posts}
        </section>
      </main>
    )
  }

}