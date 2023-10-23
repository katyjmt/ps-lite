const db = require('../config/connection');
const { User, Design, Order, Page, Category } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const designData = require('./designData.json');
const orderData = require('./orderData.json');
const pageData = require('./pageData.json');
const categoryData = require('./categoryData.json');

db.once('open', async () => {
  // clean database
  await cleanDB("User", "users");
  await cleanDB("Design", "designs");
  await cleanDB("Order", "orders");
  await cleanDB("Page", "pages");
  await cleanDB("Category", "categories");

  // bulk create each model
  const users = await User.insertMany(userData);
  const designs = await Design.insertMany(designData);
  const orders = await Order.insertMany(orderData);
  const pages = await Page.insertMany(pageData);
  const categories = await Category.insertMany(categoryData);

  for (newDesign of designs) {
    // randomly add a user to each design
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newDesign.user = tempUser._id;
    await newDesign.save();
  };

  for (newDesign of designs) {
    // for each design, choose 5 random pages and add them to its pages array
    for (let i = 0; i < 5; i++) {
      const tempPage = pages[Math.floor(Math.random() * pages.length)];
      newDesign.pages.push(tempPage._id);
      await newDesign.save();
    };
  };

  for (newOrder of orders) {
    // randomly add a user to each order
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newOrder.user = tempUser._id;
    await newOrder.save();
  };

  for (newOrder of orders) {
    // for each order, choose 2 random designs and add them to its pages array
    for (let i = 0; i < 2; i++) {
      const tempDesign = pages[Math.floor(Math.random() * designs.length)];
      newOrder.pages.push(tempDesign._id);
      await newOrder.save();
    };
  };

  console.log('all done!');
  process.exit(0);
});
