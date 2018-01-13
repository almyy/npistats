// @flow

import React, { Component } from 'react';
import type { OwnerType } from '../../types';
import { graphql } from 'react-apollo';

import { ALL_OWNERS_QUERY } from '../../graphql/queries';

import style from './OwnerList.css';

type OwnerListProps = {
    data: {
      allOwners: Array<OwnerType>,
      loading: boolean,
    }
}

const OwnerListItem = ({owner}: {owner: OwnerType}) => {
    return (
        <div className={style.root}> 
          {owner.ownerName} 
          
        </div>
    )
}

class OwnerList extends Component<OwnerListProps> {
  render() {
    console.log(this.props)
    const { data: {loading, allOwners  }} = this.props;
    if (loading) return <div/>
    return (
      <div className={style.ownerList}>
        {
          allOwners.map(owner => {
            return <OwnerListItem owner={owner} />
          })
        }
      </div>
    );
  }
}

const withAllOwners = graphql(ALL_OWNERS_QUERY);

export default graphql(ALL_OWNERS_QUERY)(OwnerList);
