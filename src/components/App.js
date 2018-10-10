import React from "react";
import axios from "axios";
import "./App.css";

import Posts from "./Posts";
import NewPost from "./NewPost";

class App extends React.Component {
  state = {
    posts: [],
    comments: {},
    allCommentsRevealed: {}
  };

  componentDidMount() {
    axios.get("//localhost:3000/posts").then(res => {
      const posts = res.data;
      this.setState({ posts });

      posts.forEach(posts =>
        axios.get(`//localhost:3000/posts/${posts.id}/comments`).then(res => {
          const oldComments = this.state.comments;
          const newComments = { ...oldComments, [posts.id]: res.data };
          this.setState({ comments: newComments });
        })
      );
    });
  }

  handleNewPostSubmission(post) {
    axios.post("//localhost:3000/posts", post).then(res => {
      const newPosts = [res.data.post].concat(this.state.posts);
      this.setState({ posts: newPosts });
    });
  }

  handleDeleteComment(postId, commentId) {
    axios
      .delete(`//localhost:3000/posts/${postId}/comments/${commentId}`)
      .then(res => {
        const oldCommentsForPost = this.state.comments[postId];
        const newCommentsForPost = oldCommentsForPost.filter(
          comment => comment.id !== commentId
        );
        console.log(commentId);
        console.log(this.state.comments);
        console.log(newCommentsForPost);
        console.log({ ...this.state.comments, [postId]: newCommentsForPost });
        this.setState({
          comments: { ...this.state.comments, [postId]: newCommentsForPost }
        });
      });
  }

  handleRevealAllComments(postId) {
    const allCommentsRevealed = this.state.allCommentsRevealed;
    this.setState({
      allCommentsRevealed: { ...allCommentsRevealed, [postId]: true }
    });
  }

  render() {
    return (
      <div className="App-page">
        <div className="App-header" />
        <div className="App-name">
          <span>Jobbot.me</span> Blog
        </div>

        <Posts
          posts={this.state.posts}
          comments={this.state.comments}
          allCommentsRevealed={this.state.allCommentsRevealed}
          handleRevealAllComments={this.handleRevealAllComments.bind(this)}
          handleDeleteComment={this.handleDeleteComment.bind(this)}
        />

        <NewPost onSubmit={this.handleNewPostSubmission.bind(this)} />
        <div className="App-footer" />
      </div>
    );
  }
}

export default App;
