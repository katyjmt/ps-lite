const db = require('../config/connection');
const { User, Design, Order, Category, Page, File } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const designData = require('./designData.json');
const orderData = require('./orderData.json');
const categoryData = require('./categoryData.json');
const pageData = require('./pageData.json');
const fileData = require('./fileData.json')

db.once('open', async () => {
  // clean database
  await cleanDB("User", "users");
  await cleanDB("Design", "designs");
  await cleanDB("Order", "orders");
  await cleanDB("Category", "categories");
  await cleanDB("Page", "pages");
  await cleanDB("File", "files");

  // bulk create each model
  const users = await User.insertMany(userData);
  const designs = await Design.insertMany(designData);
  const orders = await Order.insertMany(orderData);
  const categories = await Category.insertMany(categoryData);
  const pages = await Page.insertMany(pageData);
  const files = await File.insertMany(fileData);

  // for each category, search for page documents with a matching category attribute and add them to its pages array
  for (newCategory of categories) {
    const categoryName = newCategory.category_name;
    for (newPage of pages) {
      const pageCategoryName = newPage.category;
      if (categoryName === pageCategoryName) {
        newCategory.pages.push(newPage._id);
        await newCategory.save();
      };
    };
  };

  // for each page, search for the ids of the files with a corresponding 'internal_id" and add them to the document
  for (newPage of pages) {
    const pageInternalId = newPage.internal_id;
    for (newFile of files) {
      const fileInternalId = newFile.internal_id;
      if (fileInternalId === pageInternalId) {
        newPage.files.push(newFile._id);
        await newPage.save();
      };
    };
  };

  // randomly add a user email to each design
  for (newDesign of designs) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newDesign.user_email = tempUser.email;
    await newDesign.save();
  };

  // for each design, choose 3 random pages and add them to its pages array
  for (newDesign of designs) {
    for (let i = 0; i < 3; i++) {
      const tempPage = pages[Math.floor(Math.random() * pages.length)];
      newDesign.pages.push(tempPage._id);
      await newDesign.save();
    };
  };

  // for each user, check for designs with matching email addresses, and add them to the user designs array
  for (newUser of users) {
    for (let i = 0; i < designs.length; i++) {
      if (newUser.email === designs[i].user_email) {
        newUser.designs.push(designs[i]._id)
        await newUser.save();
      };
    };
  };

  // randomly add a user email and its associated design array to each order
  for (newOrder of orders) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newOrder.user_email = tempUser.email;
    newOrder.designs = tempUser.designs;
    await newOrder.save();
  };

  // for each user, check for orders with matching email addresses and add to the user orders array
  for (newUser of users) {
    for (let i = 0; i < orders.length; i++) {
      if (newUser.email === orders[i].user_email) {
        newUser.orders.push(orders[i]._id)
        await newUser.save();
      };
    };
  };

  console.log('all done!');
  process.exit(0);
});
