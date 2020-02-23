import React from "react";
import axios from "axios";
import backendInstance from "../api";

class NewBook extends React.Component {
  state = {
    title: "",
    author: "",
    isbn: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let data = {
      title: this.state.title,
      author: this.state.author,
      isbn: this.state.isbn
    };

    backendInstance
      .post("/book", data)
      .then(res => {
        alert("Successfull");
        this.setState({
          title: "",
          author: "",
          isbn: ""
        });
      })
      .catch(err => {
        alert("Fail");
      });
  };

  render() {
    return (
      <div>
        <form>
          <div>
            <label>Title</label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>ISBN</label>
            <input
              name="isbn"
              value={this.state.isbn}
              onChange={this.handleChange}
            />
          </div>
          {/* ideally should attach for form onSubmit */}
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default NewBook;
