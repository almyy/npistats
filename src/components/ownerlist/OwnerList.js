// @flow

import React, { Component } from 'react';
import type { OwnerType } from '../../types';
import { graphql } from 'react-apollo';

import { ALL_OWNERS_QUERY } from '../../graphql/queries';

type OwnerListProps = {
    owners: Array<OwnerType>
}

const OwnerListItem = (props) => {
    return (
        <div> </div>
    )
}

class OwnerList extends Component<OwnerListProps> {
  render() {
    return (
      <div className="App">
        

      </div>
    );
  }
}

const withAllOwners = graphql(ALL_OWNERS_QUERY);

export default graphql(ALL_OWNERS_QUERY)(OwnerList);
