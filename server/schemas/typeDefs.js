const typeDefs = `#graphql
 type User {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String
  designs: [Design]
  orders: [Order]
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
  pages: [Page]
  cover: String!
  createdAt: String!
  updatedAt: String
 }

 type Order {
  _id: ID!
  user_email: String
  designs: [Design!]
  createdAt: String!
  updatedAt: String
 }

 type Category {
  _id: ID!
  category_name: String!
  pages: [Page]
  createdAt: String!
  updatedAt: String
 }

 type Page {
  _id: ID!
  category: String
  name: String!
  files: [File]
  internal_id: Int!
  createdAt: String!
  updatedAt: String
 }

 type File {
  _id: ID!
  pdf: String!
  jpg: [String!]
  month: Int
  year: Int
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
  category(category_name: String!): Category
  pages: [Page]
  page(_id: ID!): Page
  files(page_name: String!): [File]
  file(_id: ID!): File
 }

 type Mutation {
  addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
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