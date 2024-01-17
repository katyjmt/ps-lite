const { User, Design, Order, Category, Page, File } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { Storage } = require('@google-cloud/storage');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');


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
    categoriesByType: async (_parent, args) => {
      return await Category.find({ type: args.type })
    },
    
    categoryPagesAndImages: async (_, { category_name, yearMonthDay }) => {
      // Fetch the category first to get the category ID
      const category = await Category.findOne({ category_name: category_name });
      if (!category) {
        throw new Error("Category not found");
      }

      // Fetch pages within this category
      const pages = await Page.find({ _id: { $in: category.pages } });
      if (!pages) {
        throw new Error("No pages found in this category");
      }

      // For each page, find files that match the yearMonthDay
      const pageWithFiles = await Promise.all(pages.map(async (page) => {
        const files = await File.find({ 
          page_id: page._id,
          yearMonthDay: yearMonthDay 
        });

        return {
          page: page,
          files: files
        };
      }));

      return pageWithFiles;
    },
    weeklyCategoryPagesAndImages: async (_, { category_name, isoYearWeek }) => {
      // Fetch the category first to get the category ID
      const category = await Category.findOne({ category_name: category_name });
      if (!category) {
        throw new Error("Category not found");
      }

      // Fetch pages within this category
      const pages = await Page.find({ _id: { $in: category.pages } });
      if (!pages) {
        throw new Error("No pages found in this category");
      }

      // For each page, find files that match the yearMonthDay
      const pageWithFiles = await Promise.all(pages.map(async (page) => {
        const files = await File.find({ 
          page_id: page._id,
          isoYearWeek: isoYearWeek 
        });

        return {
          page: page,
          files: files
        };
      }));

      return pageWithFiles;
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
    // fetchFiles: async (parent, { pageIds, startYearMonthDay, endYearMonthDay }) => {
    //   return await File.find({
    //     page_id: { $in: pageIds },
    //     yearMonthDay: { $gte: startYearMonthDay, $lte: endYearMonthDay },
    //   })
    // },
    // fileData: async (parent, { pageIds, startYearMonthDay, endYearMonthDay, startIsoYearWeek, endIsoYearWeek }) => {
    //   const dateCondition = {
    //     $or: [
    //       { yearMonthDay: { $gte: startYearMonthDay, $lte: endYearMonthDay } },
    //       { isoYearWeek: { $gte: startIsoYearWeek, $lte: endIsoYearWeek } },
    //     ],
    //   };
    
    //   return await File.find({
    //     page_id: { $in: pageIds },
    //     $and: [dateCondition],
    //   });
    // },

    fileData: async (parent, { pageIds, startYearMonthDay, endYearMonthDay }) => {
      return await File.find({
        page_id: { $in: pageIds },
        yearMonthDay: { $gte: startYearMonthDay, $lte: endYearMonthDay },
      });
    },

    weeklyFileData: async (parent, { pageIds, startIsoYearWeek, endIsoYearWeek }) => {
      return await File.find({
        page_id: { $in: pageIds },
        yearMonthDay: { $gte: startIsoYearWeek, $lte: endIsoYearWeek },
      });
    },

    // fetchWeeklyFiles: async (parent, { page_id, startIsoYearWeek, endIsoYearWeek }) => {
    //   return await File.find({
    //     page_id,
    //     isoYearWeek: { $gte: startIsoYearWeek, $lte: endIsoYearWeek },
    //   })
    // },
    fetchFilesByInternalId: async (parent, { internal_id }) => {
      return await File.find({ internal_id })
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

  File: {
    
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
    addPDF: async (_parent, { pdfArray }) => {
      const storage = new Storage();
      const srcBucketName = 'ps-builder-pdfs';
      const destBucketName = 'ps-user-generated-pdfs';
      const destFileName = 'generatedPDF.pdf';
      generationMatchPrecondition = 0;

      async function getPdfBuffer(srcBucketName, fileName) {
        const bucket = storage.bucket(srcBucketName);
        const file = bucket.file(fileName);
        const [buffer] = await file.download();
        return buffer;
      }

      // Fetch all PDF files from Google Cloud Storage
      const fileBuffers = await Promise.all(
        pdfArray.map(fileName => {
          return getPdfBuffer(srcBucketName, fileName);
        })
      );

      // Create a new PDFDocument
      const mergedPdf = await PDFDocument.create();

      // Load and merge the PDFs
      for (const fileBuffer of fileBuffers) {
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      // write file sync to project folder
      const pdfFile = `/pdfs/${destFileName}`
      fs.writeFileSync(`${__dirname}/../../client/public${pdfFile}`, mergedPdfBytes);

      // Upload the merged PDF back to Google Cloud Storage
      // const mergedFile = storage.bucket(destBucketName).file(destFileName);
      // await mergedFile.save(mergedPdfBytes);

      // const pdf = `https://storage.googleapis.com/${destBucketName}/${destFileName}`

      return await Order.create({ pdfArray, pdf: pdfFile });
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