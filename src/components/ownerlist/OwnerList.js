// @flow

import React, { Component, Fragment } from "react";
import type { OwnerType } from "../../types";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { ALL_OWNERS_QUERY } from "../../graphql/queries";
import Loader from "../loader/Loader";

import style from "./OwnerList.css";

type OwnerListProps = {
  data: {
    allOwners: Array<OwnerType>,
    loading: boolean,
  },
};

const OwnerListItem = ({ owner }: { owner: OwnerType }) => {
  const winner = false;
  const loser = false;
  return (
    <Link to={`/owner/${owner.id}`} className={classNames(style.owner, "card", { winner, loser })}>
      <h3>{owner.teamNames[0]}</h3>
      {owner.teamNames.length > 1 && (
        <div className="aka">
          <h6> Also known as: </h6>
          <div className="teamNames">
            {owner.teamNames.slice(1).map(name => <span key={name}>{name}</span>)}
          </div>
        </div>
      )}
    </Link>
  );
};

class OwnerList extends Component<OwnerListProps> {
  render() {
    const { data: { loading, allOwners } } = this.props;
    if (loading) return <Loader />;
    return (
      <Fragment>
        <h3> League owners: </h3>
        <div className={style.ownerList}>
          {allOwners.map(owner => {
            return <OwnerListItem owner={owner} key={owner.id} />;
          })}
        </div>
      </Fragment>
    );
  }
}

export default graphql(ALL_OWNERS_QUERY)(OwnerList);
