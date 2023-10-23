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

  // for (newClass of classes) {
  //   // randomly add each class to a school
  //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
  //   tempSchool.classes.push(newClass._id);
  //   await tempSchool.save();

  //   // randomly add a professor to each class
  //   const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
  //   newClass.professor = tempProfessor._id;
  //   await newClass.save();

  //   // reference class on professor model, too
  //   tempProfessor.classes.push(newClass._id);
  //   await tempProfessor.save();
  // }

  console.log('all done!');
  process.exit(0);
});
