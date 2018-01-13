import gql from 'graphql-tag';

import { OWNER_DATA_FRAGMENT, GAME_DATA_FRAGMENT } from './fragments';

export const ALL_OWNERS_QUERY = gql`
  query allOwners {
      allOwners {
        ...OwnerData
      }
  }
  ${OWNER_DATA_FRAGMENT}
`;

export const OWNER_BY_OWNERID_QUERY = gql`
  query ownerByOwnerId($ownerId: String!) {
      ownerByOwnerId(ownerId: $ownerId) {
        ...OwnerData
      }
  }
  ${OWNER_DATA_FRAGMENT}
`;

export const GAMES_BY_OWNERID_QUERY = gql`
  query gamesByOwnerId($ownerId: String!) {
    gamesByOwnerId(ownerId: $ownerId) {
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
`;