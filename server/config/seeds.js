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
      image: 'invitations/Black-White-Minimalist-Luxury-Calligraphy-Wedding-Invitation-F2F8FD.png',
      price: 1.99,
      category: categories[0]._id
    },
    {
      name: 'Dark Red Flower Wedding Invitation',
      description: "This Dark Red Flower Wedding Invitation impresses with its romantic depth, featuring vibrant floral illustrations that add a touch of elegance and passion to your special day's announcement.",
      image: 'invitations/Dark-Red-Flower-Wedding-Invitation-3F3957.png',
      price: 1.99,
      category: categories[0]._id
    },
    {
      name: 'Floral Botanical Wedding Menu',
      description: 'Featuring elegant illustrations of delicate blooms and lush greenery, this Floral Botanical Wedding Menu is a tasteful accent that turns your meal selection into a work of art.',
      image: 'menus/Floral-Botanical-Wedding-Menu-F1EBF0.png',
      price: 1.99,
      category: categories[2]._id
    },
    {
      name: 'Elegant Wedding Seating Chart',
      description: 'Boasting a luxurious gold palette, this Elegant Wedding Seating Chart not only ensures organized seating but also adds a touch of regal sophistication to your wedding decor.',
      image: 'seating-charts/Black-and-Gold-Elegant-Wedding-Seating-Chart-192E4B.png',
      price: 1.99,
      category: categories[1]._id
    },
    {
      name: 'Handwritten Luxury Wedding Thank You Card',
      description: 'Infused with gratitude and elegance, this Handwritten Luxury Wedding Thank You Card features beautiful calligraphy on high-quality paper, offering a thoughtful and stylish way to express your appreciation to your guests.',
      image: 'thank-you-cards/Gold-and-Cream-Handwritten-Luxury-Wedding-Card-EBEBEB.png',
      price: 1.99,
      category: categories[3]._id
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    orders: [
      { purchaseDate: new Date().setDate(new Date().getDate() - 10),
        products: [products[0]._id, products[1]._id, products[2]._id],
        status: 'COMPLETED',
      },
      { purchaseDate: new Date().setDate(new Date().getDate() - 30),
        products: [products[3]._id, products[4]._id],
        status: 'COMPLETED',
      },
    ],
    savedProducts: [
      products[0]._id, products[1]._id, products[2]._id
    ]
  });

  console.log('users seeded');

  process.exit();
});