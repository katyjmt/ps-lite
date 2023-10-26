const db = require('../config/connection');
const { User, Design, Order, Page, File } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const designData = require('./designData.json');
const orderData = require('./orderData.json');
const pageData = require('./pageData.json');
const fileData = require('./fileData.json')

db.once('open', async () => {
  // clean database
  await cleanDB("User", "users");
  await cleanDB("Design", "designs");
  await cleanDB("Order", "orders");
  await cleanDB("Page", "pages");
  await cleanDB("File", "files");

  // bulk create each model
  const users = await User.insertMany(userData);
  const designs = await Design.insertMany(designData);
  const orders = await Order.insertMany(orderData);
  const pages = await Page.insertMany(pageData);
  const files = await File.insertMany(fileData);

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
      const tempDesign = designs[Math.floor(Math.random() * designs.length)];
      newOrder.designs.push(tempDesign._id);
      await newOrder.save();
    };
  };

  for (newFile of files) {
    // for each file, search for the id of the page with a corresponding 'internal_id" and add it to the document
    const fileInternalId = newFile.internal_id;
    for (newPage of pages) {
      const pageInternalID = newPage.internal_id;
      if (fileInternalId === pageInternalID) {
        newFile.page = newPage._id;
        await newFile.save();
      };
    };
  };

  console.log('all done!');
  process.exit(0);
});
