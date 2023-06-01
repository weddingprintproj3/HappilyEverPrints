const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Invitations' },
    { name: 'Seating Charts' },
    { name: 'Menus' },
    { name: 'Thank You Cards' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Minimalist Luxury Calligraphy Wedding Invitation',
      description: 'Combining clean lines and delicate calligraphy, this minimalist luxury wedding invitation exudes an understated elegance perfect for a refined celebration.',
      image: 'Black White Minimalist Luxury Calligraphy Wedding Invitation #F2F8FD.png',
      price: 1.99,
      category: categories[0]._id
    },
    {
      name: 'Dark Red Flower Wedding Invitation',
      description: "This Dark Red Flower Wedding Invitation impresses with its romantic depth, featuring vibrant floral illustrations that add a touch of elegance and passion to your special day's announcement.",
      image: 'Dark Red Flower Wedding Invitation #3F3957',
      price: 1.99,
      category: categories[0]._id
    }
  ]);

  console.log('products seeded');

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
