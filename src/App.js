import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import InstaList from './components/InstaList.js';
import InstaBar from './components/InstaBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    }
  }

  componentWillMount() {
    const existingToken = sessionStorage.getItem('token');
    const accessToken = window.location.hash.split("=")[1]

    if (!accessToken && !existingToken) {
      window.location.replace('https://www.instagram.com/oauth/authorize/?client_id=e80738afb2c44cb08b8b2f60a6748221&redirect_uri=http://localhost:3000&response_type=token&scope=basic+likes+comments+public_content+follower_list+relationships')
    }

    if (accessToken) {
      console.log(`New access token: ${accessToken}`);
      sessionStorage.setItem("token", accessToken);
      this.setState({
        token: accessToken
      });
    }

    if (existingToken) {
      this.setState({
        token: existingToken
      });
    }
  }

  componentDidMount(){
    this.loadData.bind(this)();
  }

  loadData() {
    this.setState({
      loading: true
    });
    fetchJsonp(`https://api.instagram.com/v1/users/self/media/recent?access_token=${this.state.token}`)
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
    fetch(`https://api.instagram.com/v1/media/${postId}/likes?access_token=${this.state.token}`, {method: "POST"})
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
      <div className="App">
        <InstaBar date={this.state.date}/>
        <InstaList 
          posts={this.state.posts} 
          likePost={this.likePost.bind(this)}
          unlikePost={this.unlikePost.bind(this)}
          loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
