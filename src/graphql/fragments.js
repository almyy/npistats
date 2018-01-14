import gql from 'graphql-tag';

export const OWNER_DATA_FRAGMENT = gql`
  fragment OwnerData on Owner {
      id
      ownerName
      teamNames
  }
`;

export const GAME_DATA_FRAGMENT = gql`
  fragment GameData on Game {
    uuid
    homeTeamId {
      ...OwnerData
    }
    awayTeamId {
      ...OwnerData
    }
    homeTeamScore
    awayTeamScore
    winner
    loser
  },
  ${OWNER_DATA_FRAGMENT}
`;