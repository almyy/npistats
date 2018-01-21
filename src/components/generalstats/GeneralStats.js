// @flow

import React from "react";

import NavHeader from "../header/NavHeader";
import SeasonStats from "./SeasonStats";

import style from "./GeneralStats.css";

const First = () => {
  return <SeasonStats season="2014" />;
};
const Second = () => <SeasonStats season="2015" />;
const Third = () => <SeasonStats season="2016" />;
const Fourth = () => <SeasonStats season="2017" />;
const All = () => <SeasonStats />;

const GeneralStats = props => {
  const { match } = props;
  const routes = [
    { title: "2014", path: `${match.path}/2014`, component: First },
    { title: "2015", path: `${match.path}/2015`, component: Second },
    { title: "2016", path: `${match.path}/2016`, component: Third },
    { title: "2017", path: `${match.path}/2017`, component: Fourth },
    { title: "All seasons", path: `${match.path}/allSeasons`, component: All },
  ];
  return <NavHeader routes={routes} className={style.navigation} />;
};

export default GeneralStats;
