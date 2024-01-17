const typeDefs = `#graphql
 type User {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String
  designs: [Design!]
  orders: [Order!]
  createdAt: String!
  updatedAt: String
 }

 type Auth {
  token: ID!
  user: User
 }

 type Design {
  _id: ID!
  user_email: String
  design_name: String!
  pages: [Page!]
  cover: String!
  createdAt: String!
  updatedAt: String
 }

 type Order {
  _id: ID!
  # user_email: String
  # designs: [Design!]
  pdfArray: [String]
  pdf: String
  createdAt: String!
  updatedAt: String
 }

 type Category {
  _id: ID!
  category_name: String!
  type: String!
  app_order: Float!
  pages: [Page!]
  createdAt: String!
  updatedAt: String
 }

 type Page {
  _id: ID!
  category: String
  name: String!
  files: [File!]
  internal_id: Int!
  createdAt: String!
  updatedAt: String
 }

  type PageWithFiles {
  page: Page!
  files: [File!]
  }

 type File {
  _id: ID!
  page_id: String!
  pdf: [String!]
  jpg: [String]
  yearMonthDay: Int
  isoYearWeek: Int
  internal_id: Int!
  createdAt: String!
  updatedAt: String
 }

 type Query {
  users: [User]
  user(_id: ID!): User
  designs: [Design]
  design(_id: ID!): Design
  orders: [Order]
  order(_id: ID!): Order
  categories: [Category]
  categoriesByType(type: String!): [Category]
  categoryPagesAndImages(category_name: String!, yearMonthDay: Int!): [PageWithFiles]
  weeklyCategoryPagesAndImages(category_name: String!, isoYearWeek: Int!): [PageWithFiles]
  category(category_name: String!): Category
  pages: [Page]
  page(_id: ID!): Page
  fileData(pageIds: [String!]!, startYearMonthDay: Int, endYearMonthDay: Int ): [File]
  weeklyFileData(pageIds: [String!]!, startIsoYearWeek: Int, endIsoYearWeek: Int ): [File]
  fetchFilesByInternalId( internal_id: Int! ): [File]
  files(page_id: ID!): [File]
  file(_id: ID!): File
 }

 type Mutation {
  addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPDF(pdfArray: [String!]): Order
  addOrder(user: ID!, designs: [ID!]): Order
  # Design first added to server after user selects cover colour, start and end months
  addDesign(user: ID!, start_month: String!, end_month: String!, cover: String!): Design
  editDesignMonths(_id: ID!, start_month: String!, end_month: String!): Design
  editCover(user: ID!, cover: String!): Design
  addPageToDesign(_id: ID!, pageId: ID!): Design
  removePageFromDesign(_id: ID!, pageId: ID!): Design
  deleteDesign(_id: ID!): Design
 }
`;

module.exports = typeDefs;