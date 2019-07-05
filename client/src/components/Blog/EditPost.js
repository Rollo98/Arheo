// import React, { Component } from "react";
// import Axios from "axios";
// import { BE_Host } from "../../config";

// class EditPost extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "", text: "" };
//   }

//   componentWillMount() {
//     Axios.get(
//       `http://${BE_Host}/blog/get/${this.props.title}/${this.props.text}`
//     ).then(Response => {
//       this.setState({
//         title: Response.data.posts[0].title,
//         text: Response.data.posts[0].text
//       });
//     });
//   }

//   render() {
//     return <div>asd</div>;
//   }
// }

// export default EditPost;
