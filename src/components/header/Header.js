import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Header.css";

const Header = () => {
  return (
    <div className={style.header}>
      <div className="container">
        <nav>
          <NavLink to="/" exact activeClassName="selected">
            {" "}
            Owners{" "}
          </NavLink>
          <NavLink to="/stats/2014" activeClassName="selected">
            {" "}
            Stats{" "}
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
