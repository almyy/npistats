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
    homeTeam {
      ...OwnerData
    }
    awayTeam {
      ...OwnerData
    }
    homeTeamScore
    awayTeamScore
    winner
    loser
    week
    season
  },
  ${OWNER_DATA_FRAGMENT}
`;