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
    homeTeamId
    awayTeamId
    homeTeamScore
    awayTeamScore
    winner
    loser
  }
`;