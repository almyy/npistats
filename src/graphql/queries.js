import gql from 'graphql-tag';

import { OWNER_DATA_FRAGMENT } from './fragments';

export const ALL_OWNERS_QUERY = gql`
  query allOwners {
      allOwners {
        ...OwnerData
      }
  }
  ${OWNER_DATA_FRAGMENT}
`;