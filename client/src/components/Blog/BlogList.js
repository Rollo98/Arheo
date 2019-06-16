import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BE_Host } from "../../config";
import ReadMoreAndLess from "react-read-more-less";

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], search: "" };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(`http://${BE_Host}/blog/get`).then(Response => {
      this.setState({ posts: Response.data.posts });
    });
  }

  renderPosts() {
    const posts = Object.values(this.state.posts).filter(
      post =>
        post.title.indexOf(this.state.search) !== -1 ||
        post.text.indexOf(this.state.search) !== -1
    );
    var x = posts.map(n => (
      <div className="card mt-3" key={n._id}>
        <h5 className="card-header">{n.title}</h5>
        <div className="card-body">
          <p className="card-description">
            <ReadMoreAndLess
              // ref={this.ReadMore}
              charLimit={250}
              readMoreText="Citește mai mult"
              readLessText="Citește mai puțin"
            >
              {n.text}
            </ReadMoreAndLess>
          </p>
        </div>
      </div>
    ));
    return x;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="posts mb-5">
        <input
          autoComplete="off"
          name="search"
          type="text"
          value={this.state.search}
          className="form-control mt-2 searchBar"
          placeholder="Search..."
          aria-label="Search"
          onChange={this.handleChange}
        />
        {this.renderPosts()}
      </div>
    );
  }
}

export default BlogList;
