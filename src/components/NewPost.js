import React from "react";
import "./NewPost.css";

export default class NewPost extends React.Component {
  state = {
    title: "",
    text: ""
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleTextChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const post = {
      title: this.state.title,
      text: this.state.text
    };

    this.props.onSubmit(post);
    this.setState({ title: "", text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="NewPost-title"
            type="text"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
          />
          <input
            className="NewPost-text"
            type="text"
            placeholder="Text"
            name="text"
            value={this.state.text}
            onChange={this.handleTextChange.bind(this)}
          />
          <button className="NewPost-button" type="submit">
            Post
          </button>
        </form>
      </div>
    );
  }
}
