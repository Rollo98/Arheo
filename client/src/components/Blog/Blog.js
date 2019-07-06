import React from "react";

import BlogList from "./BlogList";
import Footer from "../Footer";

export default (props) => {
  return (
    <div>
      <BlogList {...props} />
      <Footer />
    </div>
  );
};
