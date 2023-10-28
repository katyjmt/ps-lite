const { User, Design, Order, Page, File } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_parent, args) => {
      return await User.findById(args._id);
    },
    designs: async () => {
      return await Design.find({});
    },
    design: async (_parent, args) => {
      return await Design.findById(args._id);
    },
    orders: async () => {
      return await Order.find({});
    },
    order: async (parent, args) => {
      return await Order.findById(args._id);
    },
    pages: async () => {
      return await Page.find({});
    },
    page: async (parent, args) => {
      return await Page.findById(args._id);
    },
    files: async () => {
      return await File.find({});
    },
    file: async (parent, args) => {
      return await File.findById(args._id);
    },
  },

  Design: {
    user: async (parent) => {
      const res = await Design.findById(parent._id).populate("user");
      return res.user;
    },
    pages: async (parent) => {
      const res = await Design.findById(parent._id).populate("pages");
      return res.pages;
    }
  },

  Order: {
    user: async (parent) => {
      const res = await Order.findById(parent._id).populate("user");
      return res.user;
    },
    designs: async (parent) => {
      const res = await Order.findById(parent._id).populate("designs");
      return res.designs;
    }
  },

  File: {
    page: async (parent) => {
      const res = await File.findById(parent._id).populate("page");
      return res.page;
    },
  },

  Mutation: {
    addUser: async (_parent, {first_name, last_name, email, password}) => {
      return await User.create({first_name, last_name, email, password});
    },
    addOrder: async (_parent, {user, designs}) => {
      return await Order.create({user, designs});
    },
    addDesign: async (_parent, {user, start_month, end_month, cover}) => {
      return await Design.create({user, start_month, end_month, cover});
    },
    editDesignMonths: async (_parent, {_id, start_month, end_month}) => {
      return await Design.findOneAndUpdate(
        { _id }, 
        { start_month },
        { end_month },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    editCover: async (_parent, {_id, cover}) => {
      return await Design.findOneAndUpdate(
        { _id }, 
        { cover },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    addPageToDesign: async (_parent, {_id, pageId}) => {
      try {
        const design = await Design.findById(_id);

        if (!design) {
          throw new Error('Design not found');
        }

        design.pages.push(pageId);
        await design.save();
        return design;
      } catch (error) {
        throw new Error(`Failed to add pages to the design: ${error.message}`);
      }
    },
    removePageFromDesign: async (_parent, {_id, pageId}) => {
      try {
        const design = await Design.findById(_id);

        if (!design) {
          throw new Error('Design not found');
        }

        const pagesArray = design.pages;

        const pageIndex = pagesArray.indexOf(pageId);

        pagesArray.splice(pageIndex, 1);
        await design.save();
        return design;
      } catch (error) {
        throw new Error(`Failed to remove pages from the design: ${error.message}`);
      }
    },
    deleteDesign: async (_parent, {_id}) => {
      return await Design.findByIdAndRemove({_id});
    }
  }
}

module.exports = resolvers;