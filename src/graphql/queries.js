import gql from "graphql-tag";

import { OWNER_DATA_FRAGMENT, GAME_DATA_FRAGMENT } from "./fragments";

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

export const GAMES_BY_SEASON_QUERY = gql`
  query gamesBySeason($season: Float) {
    gamesBySeason(season: $season) {
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
`;

export const REGULAR_SEASON_GAMES_BY_OWNERID_QUERY = gql`
  query regularSeasonGamesByOwnerId($ownerId: String!) {
    regularSeasonGamesByOwnerId(ownerId: $ownerId) {
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
`;

export const PLAY_OFF_GAMES_BY_OWNERID_QUERY = gql`
  query playOffGamesByOwnerId($ownerId: String!) {
    playOffGamesByOwnerId(ownerId: $ownerId) {
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
`;
