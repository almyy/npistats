import React, { Fragment } from "react";
import classNames from "classnames";
import OwnerList from "../ownerlist/OwnerList";
import style from "./RootContainer.css";
import { Switch, Route } from "react-router-dom";
import Header from "../header/Header";
import Owner from "../owner/Owner";

import GeneralStats from "../generalstats/GeneralStats";

const RootContainer = () => {
  return (
    <Fragment>
      <Header />
      <div className={classNames("container", style.container)}>
        <Switch>
          <Route path="/" exact component={OwnerList} />
          <Route path="/stats" component={GeneralStats} />
          <Route path="/owner/:ownerId" component={Owner} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default RootContainer;
