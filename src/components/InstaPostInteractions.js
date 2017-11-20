import React from 'react';
import Modal from 'react-modal';
import '../css/InstaPostInteractions.css';
import InstaLikes from './InstaLikes.js';

export default class InstaPostInteractions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }



  render () {
    const comments = this.props.comments.count ? (<li><a className="caption-more" href="#">View all {this.props.comments.count} comments</a></li>) : null;
          // onAfterOpen={afterOpenFn}
          
          // closeTimeoutMS={n}
    const openModal = () => {
      this.setState({
        modal: true
      });
    };

    const closeModal = () => {
      this.setState({
        modal: false
      });
    };

    const toggleLike = () => {
      this.setState({
        likeOverride: !this.state.likeOverride
      });
    };

    const liked = (this.state.likeOverride === undefined) ? this.props.user_has_liked : this.state.likeOverride;
    const likeButton = liked ? (<a href="#" onClick={toggleLike}><span className="liked-button"></span></a>) : (<a href="#" onClick={toggleLike}><span className="like-button"></span></a>);
    
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

    return (
      <div className="Post-interactions">
        <Modal
          isOpen={this.state.modal}
          contentLabel="Modal"
          onRequestClose={closeModal}
          style={style}
        >
          <InstaLikes id={this.props.id} token={this.props.token}/>
        </Modal>
        <section className="toolbar">          
          {likeButton}
          <a href="#">
            <span className="comment-button"></span>
          </a>
        </section>
        <section className="likes-count">
          <div>
            <a href="#" onClick={openModal}>
              <span>{this.props.likes.count} likes</span>
            </a>
          </div>
        </section>
        <section className="caption">
          <ul>
            <li>
              <a className="caption-user" href={`/user/${this.props.user.id}`}>{this.props.user.username}</a> 
              <span>{this.props.caption.text}</span>
            </li>
            {comments}
          </ul>
        </section>
        <section className="comment-box">
          <form>
            <textarea placeholder="Add a comment...">
            </textarea>
          </form>
        </section>
      </div>
    );
  }
}