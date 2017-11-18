import React from 'react';
import '../InstaPostInteractions.css';

export default class InstaLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(props) {
    this.loadData();
  }

  loadData() {
    fetch(`https://api.instagram.com/v1/media/${this.props.id}/likes?access_token=${this.props.token}`)
      .then((d) => {
        return d.json()
      }).then((data) => {
        this.setState({
          likes: data.data
        })
      }).catch((e) => {
        console.log(e);
      })

  }

  render() {
    console.log(this.state.likes);

    const likes = this.state.likes && this.state.likes.map((like) => {
      return (
        <div className="Post-header">
          <div className="Post-header-image">
            <img 
              className="Post-profile-image"
              src={like.profile_picture} 
              alt=""/>
          </div>
          <div className="Post-header-name">
            <div className="name">
              <a href={`/user/${like.id}`}>{like.username}</a>
            </div>
            <div className="location">
              {like.full_name}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {likes}
      </div>
    );
  }
}
