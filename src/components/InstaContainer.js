import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import InstaList from './InstaList.js';

export default class InstaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    console.log("mounted");
    this.loadData.bind(this)();
  }

  loadData() {
    this.setState({
      loading: true
    });
    
    fetchJsonp(`https://api.instagram.com/${this.props.url}?access_token=${this.props.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        this.setState({
          date: new Date().toString()
        });        
        this.setState({
          posts: json,
          loading: false
        })
      });
  }

  likePost(postId) {
    console.log(`Liked ${postId}`)
    fetch(`https://api.instagram.com/v1/media/${postId}/likes?access_token=${this.props.token}`, {method: "POST"})
      .then(() => {
        this.loadData()
      }).catch((e) => {
        console.log(e);
      })
  }

  unlikePost(postId) {
    console.log(`Unliked ${postId}`)
    fetch(`https://api.instagram.com/v1/media/${postId}/likes?access_token=${this.state.token}`, {method: "DELETE"})
      .then(() => {
        this.loadData()
      }).catch((e) => {
        console.log(e);
      })
  }

  render() {
    return (
      <InstaList 
        posts={this.state.posts} 
        likePost={this.likePost.bind(this)}
        unlikePost={this.unlikePost.bind(this)}
        loading={this.state.loading}/>
    );
  }
}
