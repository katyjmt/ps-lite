import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(first_name: $firstName, last_name: $lastName, email: $email, password: $password) {
    token
    user {
      _id
      email
      first_name
      last_name
    }
  }
}
`;

// export const ADD_ORDER = gql`
//   query singleUser($id: ID!) {
//     user(_id: $id) {
//       first_name
//       last_name
//       email
//     }
// }
// `