const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Invitations' },
    { name: 'Guest List' },
    { name: 'Menu' },
    { name: 'Thank You Card' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  await User.deleteMany();

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
  });

  console.log('users seeded');

  process.exit();
});
