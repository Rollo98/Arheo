import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer text-center  p-2">
      <Link className="text-white col" to="/Despre">
        Despre
      </Link>
      <Link className="text-white col" to="/Conditii-de-utilizare">
        Conditii de utilizare
      </Link>
    </div>
  );
};

export default Footer;
