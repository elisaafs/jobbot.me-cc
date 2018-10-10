import React from "react";
import "./Posts.css";

import Comments from "./Comments";

export default class Posts extends React.Component {
  render() {
    return (
      <ul>
        {this.props.posts.slice(0, 10).map((post, index) => (
          <div key={index}>
            <div className="Posts-title">{post.title}</div>
            <div className="Posts-text">{post.text}</div>
            {this.props.comments[post.id] ? (
              <Comments
                comments={this.props.comments[post.id]}
                allCommentsRevealed={
                  this.props.allCommentsRevealed[post.id] === true
                }
                handleDeleteComment={this.props.handleDeleteComment.bind(
                  this,
                  post.id
                )}
                handleRevealAllComments={this.props.handleRevealAllComments.bind(
                  this,
                  post.id
                )}
              />
            ) : null}
          </div>
        ))}
      </ul>
    );
  }
}
