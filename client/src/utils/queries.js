import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
  users {
    _id
    first_name
    last_name
    email
  }
}
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(_id: $id) {
      first_name
      last_name
      email
    }
}
`;

export const QUERY_CATEGORIES = gql`
  query allCategories {
    categories {
      _id
      category_name
    }
  }
`;


export const QUERY_SINGLE_CATEGORY = gql`
  query singleCategory($categoryName: String!) {
    category(category_name: $categoryName) {
      _id
      category_name
      pages {
        _id
        name
      }
    }
  }
`;

export const QUERY_SINGLE_PAGE = gql`
  query Page($id: ID!) {
    page(_id: $id) {
      name
      internal_id
      files {
        jpg
        pdf
        month
      }
    }
  }
`;


