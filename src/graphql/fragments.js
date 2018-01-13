import gql from 'graphql-tag';

export const OWNER_DATA_FRAGMENT = gql`
  fragment OwnerData on Owner {
      id
      ownerName
      teamNames
  }
`;