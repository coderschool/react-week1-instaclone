import React from 'react';
import Modal from 'react-modal';
import fetchJsonp from 'fetch-jsonp';
import InstaProfile from './InstaProfile.js';
import InstaFollow from './InstaFollow.js';

// User profile
// Simple feed

export default class InstaFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
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
          self: json,
          loading: false
        })
      });
  }

  loadFollows() {
    this.setState({
      loading: true
    });
    fetchJsonp(`https://api.instagram.com/v1/users/self/follows?access_token=${this.props.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        this.setState({
          follows: json,
          loading: false
        })
      });    
  }

  loadFollowedBy() {
    this.setState({
      loading: true
    });
    fetchJsonp(`https://api.instagram.com/v1/users/self/followed-by?access_token=${this.props.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        this.setState({
          followedBy: json,
          loading: false
        })
      });    
  }  

  render() {
    var selfData = this.state.self || {data: []};
    selfData = selfData.data;
    selfData.counts = selfData.counts || {};

    var followsData = this.state.follows || {data: []};
    followsData = followsData.data;

    var followedByData = this.state.followedBy || {data: []};
    followedByData = followedByData.data;

    const openModalFollowedBy = (e) => {
      e.preventDefault();
      this.loadFollowedBy();
      this.setState({
        modal: true,
        followedBy: true,
        follows: false
      });
    };

    const openModalFollows = (e) => {
      e.preventDefault();      
      this.loadFollows();
      this.setState({
        modal: true,
        follows: true,
        followedBy: false
      });
    };    

    const closeModal = (e) => {
      e.preventDefault();
      this.setState({
        modal: false
      });
    };    

    const style = {
      overlay: {
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.7)'        
      },
      content: {
        width: '600px',
        height: '600px'
      }
    }

    const friendsData = this.state.follows ? followsData : followedByData;

    return (        
      <div>
        <Modal
          isOpen={this.state.modal}
          contentLabel="Modal"
          onRequestClose={closeModal}
          style={style}
        >
          <InstaFollow id={this.props.id} loading={this.state.loading} friends={friendsData}/>
        </Modal>        
        <InstaProfile 
          openModalFollowedBy={openModalFollowedBy} 
          openModalFollows={openModalFollows}
          {...selfData}
        />
      </div>
    );
  }
}