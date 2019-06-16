import React from "react";

import ArheoList from "./ArheoList";
import Footer from "../Footer";

export default (props) => {
  console.log(props.location)
  return (
    <div>
      <ArheoList />
      <Footer />
    </div>
  );
};
