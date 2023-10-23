const { User, Design, Order, Page, Category } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    designs: async () => {
      return Design.find({});
    },
    design: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Design.find(params);
    },
    orders: async () => {
      return Order.find({});
    },
    order: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Order.find(params);
    },
    pages: async () => {
      return Page.find({});
    },
    page: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Page.find(params);
    },
    categories: async () => {
      return Category.find({});
    },
    category: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Category.find(params);
    },
  }

  // Mutation: {

  // }
}

module.exports = resolvers;