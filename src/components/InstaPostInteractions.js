import React from 'react';
import '../InstaPostInteractions.css';

export default class InstaPostInteractions extends React.Component {

  render () {
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
        <section className="likes-count">
          <div>
            <a href="#">
              <span>{this.props.comments.count} comments</span>
            </a>
          </div>
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