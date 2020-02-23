import React from "react";
import axios from "axios";
import Loading from "../assets/loading.gif";
import backendInstance from "../api";
import Book from "./Book";

class SearchBook extends React.Component {
  state = {
    error: false,
    loading: false,
    data: [],
    searchTerm: ""
  };

  performSearch = () => {
    this.setState({ loading: true });
    backendInstance
      .get("/book", { params: { s: this.state.searchTerm } })
      //   .get("/book" + "?s=" + this.state.searchTerm)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(err => {
        this.setState({ error: "Something went wrong" });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.performSearch();
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    if (this.state.loading == true) {
      return <img src={Loading} />;
    }

    return (
      <div>
        <div>
          <input
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="Search for book"
          />
          <button onClick={this.performSearch}>Search</button>
        </div>
        <div>
          <h2>Results</h2>
          {/* {JSON.stringify(this.state.data, 4)} */}
          {this.state.data.map((v, index) => {
            return (
              <Book
                isbn={v.isbn}
                author={v.author}
                title={v.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchBook;
