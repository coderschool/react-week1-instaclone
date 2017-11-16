import React from 'react';
import fetchJsonp from 'fetch-jsonp';

// User profile
// Simple feed

export default class InstaFriends extends React.Component {
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
          friends: json,
          self: json,
          loading: false
        })
      });
  }  

  render() {
    console.log(this.state.friends);
    var selfData = this.state.self || {data: []};
    selfData = selfData.data;

    return (
      <div>
        <button>
          <img src={selfData.profile_picture} />
        </button>
      </div>
    );
  }
}