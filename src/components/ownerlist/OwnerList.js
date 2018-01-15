// @flow

import React, { Component, Fragment } from 'react';
import type { OwnerType } from '../../types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ALL_OWNERS_QUERY } from '../../graphql/queries';

import style from './OwnerList.css';

type OwnerListProps = {
    data: {
      allOwners: Array<OwnerType>,
      loading: boolean,
    }
}

const OwnerListItem = ({owner}: {owner: OwnerType}) => {
    const winner = owner.id === "31019";
    const loser = owner.id === "7342189";
    return (
      <Link to={`/owner/${owner.id}`} className={classNames(style.owner, "card", {winner, loser})}>
        <h3>{owner.teamNames[0]}</h3>
        {owner.teamNames.length > 1 && <div className="aka">
          <h6> Also known as: </h6>
          <div className="teamNames">
          {owner.teamNames.slice(1).map(name => <span>{name}</span>)}
          </div>
          </div>
        }
      </Link>
    )
}

class OwnerList extends Component<OwnerListProps> {
  render() {
    const { data: {loading, allOwners  }} = this.props;
    if (loading) return <div/>
    return (
      <Fragment>
        <h3> League owners: </h3>
        <div className={style.ownerList}>
        {
          allOwners.map(owner => {
            return <OwnerListItem owner={owner} />
          })
        }
      </div>
      </Fragment>
    );
  }
}

const withAllOwners = graphql(ALL_OWNERS_QUERY);

export default graphql(ALL_OWNERS_QUERY)(OwnerList);
