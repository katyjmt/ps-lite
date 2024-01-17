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

export const QUERY_CATEGORY_PAGES_IMAGES = gql`
  query CategoryPagesAndImages($categoryName: String!, $yearMonthDay: Int!) {
    categoryPagesAndImages(category_name: $categoryName, yearMonthDay: $yearMonthDay) {
      page {
        _id
        category
        internal_id
        name
      }
      files {
        _id
        yearMonthDay
        isoYearWeek
        jpg
      }
    }
  }
`

export const QUERY_WEEKLY_CATEGORY_PAGES_IMAGES = gql`
query WeeklyCategoryPagesAndImages($categoryName: String!, $isoYearWeek: Int!) {
  weeklyCategoryPagesAndImages(category_name: $categoryName, isoYearWeek: $isoYearWeek) {
      page {
        _id
        category
        internal_id
        name
      }
      files {
        _id
        yearMonthDay
        isoYearWeek
        jpg
      }
  }
}
`

export const QUERY_CATEGORIES_BY_TYPE = gql`
  query CategoriesByType($type: String!) {
  categoriesByType(type: $type) {
    _id
    category_name
    app_order
    type
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
  query QuerySinglePage($id: ID!) {
    page(_id: $id) {
      _id
      name
      files {
        jpg
      }
    }
  }
`;

export const QUERY_FILES = gql`
  query FileData($pageIds: [String!]!, $startYearMonthDay: Int, $endYearMonthDay: Int) {
    fileData(pageIds: $pageIds, startYearMonthDay: $startYearMonthDay, endYearMonthDay: $endYearMonthDay) {
      page_id
      internal_id
      _id
      yearMonthDay
      isoYearWeek
      pdf
    }
  }
`;

export const QUERY_WEEKLY_FILES = gql`
  query weeklyFileData($pageIds: [String!]!, $startIsoYearWeek: Int, $endIsoYearWeek: Int) {
    fileData(pageIds: $pageIds, startIsoYearWeek: $startIsoYearWeek, endIsoYearWeek: $endIsoYearWeek) {
      page_id
      internal_id
      _id
      yearMonthDay
      isoYearWeek
      pdf
    }
  }
`;

// export const QUERY_FILES = gql`
//   query FetchFiles($pageId: ID!, $startYearMonthDay: Int!, $endYearMonthDay: Int!) {
//     annualMonthlyDailyFiles(page_id: $pageId, startYearMonthDay: $startYearMonthDay, endYearMonthDay: $endYearMonthDay) {
//       _id
//       internal_id
//       yearMonthDay
//       isoYearWeek
//       pdf
//     }
//   }
// `;

// export const QUERY_WEEKLY_FILES = gql`
//   query FetchWeeklyFiles($pageId: ID!, $startIsoYearWeek: Int!, $endIsoYearWeek: Int!) {
//     weeklyFiles(page_id: $pageId, startIsoYearWeek: $startIsoYearWeek, endIsoYearWeek: $endIsoYearWeek) {
//       _id
//       internal_id
//       isoYearWeek
//       pdf
//     }
//   }
// `;

export const QUERY_FILES_BY_INTERNAL_ID = gql`
  query FetchFilesByInternalId($internalId: Int!) {
    fetchFilesByInternalId(internal_id: $internalId) {
      _id
      internal_id
      pdf
    }
  }
`
