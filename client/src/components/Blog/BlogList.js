import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BE_Host } from "../../config";
import { connect } from "react-redux";

// import ReadMoreAndLess from "react-read-more-less";

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], search: "" };
  }

  init() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(`http://${BE_Host}/blog/get`).then(Response => {
      this.setState({ posts: Response.data.posts });
    });
  }
  componentDidMount() {
    this.init()
  }

  async handleDelete(uid) {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    const response = await Axios.delete(
      `http://${BE_Host}/blog/delete/${uid}`
    );
    //Need to create a method to redirect you to /Blog
    console.log(response)
    if (!response.error) {
      this.init()
    }
  }
  redirectToEdit(uid) {
    console.log(this.props.history)
    this.props.history.push(`/edit/${uid}`)
  }
  renderPosts() {
    const posts = Object.values(this.state.posts).filter(
      post => post.title.indexOf(this.state.search) !== -1
      // ||
      // post.text.indexOf(this.state.search) !== -1
    );
    var x = posts.map(n => (
      <div className="card mt-3" key={n._id}>
        <h5 className="card-header">
          {n.title}
          {this.props.role.includes("writer") ? (
            <>
              <button
                className="float-right btn btn-primary"
                onClick={() => {
                  console.log(this.props);
                  this.redirectToEdit(n.uid)
                }}      >
                Editează
              </button>

              <button
                className="float-right mr-1 btn btn-danger"
                onClick={e => this.handleDelete(n.uid)}
              >
                Șterge
              </button>
            </>
          ) : null}
        </h5>
        <div className="card-body">
          <p className="card-description">
            {n.text}
            {/* <ReadMoreAndLess
              // ref={this.ReadMore}
              charLimit={250}
              readMoreText="Citește mai mult"
              readLessText="Citește mai puțin"
            >
              {n.text}
            </ReadMoreAndLess> */}
          </p>
          <p className="text-muted blockquote-footer">
            Autor: {n.author} | Adaugat la: {n.addDate}
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
    console.log(this.state);

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

function MapStateToProps(state) {
  return {
    role: state.auth.role
  };
}

export default connect(MapStateToProps)(BlogList);
