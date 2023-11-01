const { User, Design, Order, Category, Page, File } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
    order: async (_parent, args) => {
      return await Order.findById(args._id);
    },
    categories: async (_parent, args) => {
      return await Category.find({});
    },
    category: async (_parent, args) => {
      return await Category.findOne({ category_name: args.category_name });
    },
    pages: async (_parent, args) => {
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

  User: {
    designs: async (parent) => {
      const res = await User.findById(parent._id)
      .populate("designs")
      .populate({
        path: 'designs',
        populate: {
          path: 'pages',
          populate: {
            path: 'files',
          },
        }
      });
      return res.designs;
    },
    orders: async (parent) => {
      await User.findById(parent._id)
      .populate("orders")
      return res.orders;
    }
  },

  Category: {
    pages: async (parent) => {
      const res = await Category.findOne({ category_name: parent.category_name })
      .populate("pages")
      .populate({
        path: 'pages',
        populate: 'files',
      })
      return res.pages;
    },
  },

  Page: {
    files: async (parent) => {
      const res = await Page.findById(parent._id)
      .populate("files")
      return res.files;
    },
  },

  Mutation: {
    addUser: async (_parent, { first_name, last_name, email, password }) => {
      const user = await User.create({ first_name, last_name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
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