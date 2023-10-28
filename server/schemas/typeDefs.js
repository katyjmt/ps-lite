const typeDefs = `#graphql
 type User {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String
  createdAt: String!
  updatedAt: String
 }

 type Design {
  _id: ID!
  user: User!
  start_month: String!
  end_month: String!
  pages: [Page]
  cover: String!
  createdAt: String!
  updatedAt: String
 }

 type Order {
  _id: ID!
  designs: [Design!]
  user: User!
  createdAt: String!
  updatedAt: String
 }

 type Page {
  _id: ID!
  category: String!
  name: String!
  internal_id: Int!
  createdAt: String!
  updatedAt: String
 }

 type File {
  _id: ID!
  pdf: String!
  jpg: [String!]
  internal_id: Int!
  createdAt: String!
  updatedAt: String
  page: Page!
 }

 type Query {
  users: [User]
  user(_id: ID!): User
  designs: [Design]
  design(_id: ID!): Design
  orders: [Order]
  order(_id: ID!): Order
  pages: [Page]
  page(_id: ID!): Page
  files: [File]
  file(_id: ID!): File
 }

 type Mutation {
  addUser(first_name: String!, last_name: String!, email: String!, password: String!): User
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