import React, { Component } from 'react';
import './css/App.css';
import InstaBar from './components/InstaBar.js';
import InstaContainer from './components/InstaContainer.js';
import InstaFriends from './components/InstaFriends.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

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

  render() {
    const Home = () => (
      <InstaContainer token={this.state.token} url="v1/users/self/media/recent" />
    );

    const Self = () => (
      <InstaFriends token={this.state.token} url="v1/users/self"/>
    );

    const SelfLiked = () => (
      <InstaContainer token={this.state.token} url="v1/users/self/media/liked" />
    );

    const UserFeed = (match) => {
      const userId = match.match.params.userId;
      return (
        <InstaContainer token={this.state.token} url={`v1/users/${userId}/media/recent`} />
      );
    };

    const TagFeed = (match) => {
      const tag = match.match.params.tag;
      return (
        <InstaContainer token={this.state.token} url={`v1/tags/${tag}/media/recent`} />
      );
    };

    const LocationFeed = (match) => {
      const location = match.match.params.location;
      return (
        <InstaContainer token={this.state.token} url={`v1/locations/${location}/media/recent`} />
      );
    };

    return (
      <div className="App">
        <InstaBar />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/self" component={Self} />
            <Route exact path="/self/liked" component={SelfLiked} />
            <Route path="/user/:userId" component={UserFeed} />
            <Route path="/tag/:tag" component={TagFeed} />
            <Route path="/location/:location" component={LocationFeed} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
