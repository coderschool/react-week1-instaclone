import React from 'react';
import '../InstaPostInteractions.css';

export default class InstaPostInteractions extends React.Component {

  render () {
    const comments = this.props.comments.count ? (<li><a className="caption-more" href="#">View all {this.props.comments.count} comments</a></li>) : null;

    return (
      <div className="Post-interactions">
        <section className="toolbar">
          <a href="#">
            <span className="liked-button"></span>
          </a>            
          <a href="#">
            <span className="comment-button"></span>
          </a>
        </section>
        <section className="likes-count">
          <div>
            <a href="#">
              <span>{this.props.likes.count} likes</span>
            </a>
          </div>
        </section>
        <section className="caption">
          <ul>
            <li>
              <a className="caption-user" href="#">{this.props.user.username}</a> 
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