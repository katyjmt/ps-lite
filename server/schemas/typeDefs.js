const typeDefs = `#graphql
 type User {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String!
  designs: [Design!]
 }

 type Design {
  _id: ID!
  user: User!
  page_selection: [Page!]
  cover_type: String!
  orders: [Order!]
 }

 type Order {
  _id: ID!
  design: Design!
  user: User!
  pdf: String!
 }

 type Page {
  _id: ID!
  category: Category!
  title: String!
  description: String!
  pdf: [String!]
  jpg: [String!]
 }

 type Category {
  _id: ID!
  category_name: String!
  description: String!
  pages: [Page!]
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
  categories: [Category]
  category(_id: ID!): Category
 }
`;

module.exports = typeDefs;