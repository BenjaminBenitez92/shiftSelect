import { gql } from '@apollo/client';

export const QUERY_SHIFTS = gql`
  query getShifts($hospital: ID) {
    shifts(hospital: $hospital) {
      _id
      name
      description
      hours
      shiftDate
      hospital {
        _id
      }
    }
  }
`;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

export const QUERY_ALL_SHIFTS = gql`
  {
    shifts {
      _id
      name
      description
      hours
      shiftDate
      hospital {
        name
      }
    }
  }
`;

export const QUERY_HOSPITALS = gql`
  {
    hospitals {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      schedules {
        _id
        shifts {
          _id
          name
          description
          hours
          shiftDate
        }
      }
    }
  }
`;
