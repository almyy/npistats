// @flow

import React, { Fragment } from "react";

import classNames from "classnames";
import NavHeader from "../header/NavHeader";
import SeasonStats from "./SeasonStats";

import style from "./GeneralStats.css";

const First = () => {
  return <SeasonStats season="2014" />;
};
const Second = () => <SeasonStats season="2015" />;
const Third = () => <SeasonStats season="2016" />;
const Fourth = () => <SeasonStats season="2017" />;
const All = () => <SeasonStats season="ass" />;

const GeneralStats = props => {
  const { match } = props;
  const routes = [
    { title: "2014", path: `${match.path}/2014`, component: First },
    { title: "2015", path: `${match.path}/2015`, component: Second },
    { title: "2016", path: `${match.path}/2016`, component: Third },
    { title: "2017", path: `${match.path}/2017`, component: Fourth },
    { title: "All seasons", path: `${match.path}/allSeasons`, component: All },
  ];
  return (
    <Fragment>
      <div className={classNames(style.header, "card")}>
        <h3>Stats</h3>
      </div>
      <NavHeader routes={routes} className={style.navigation} />
    </Fragment>
  );
};

export default GeneralStats;
