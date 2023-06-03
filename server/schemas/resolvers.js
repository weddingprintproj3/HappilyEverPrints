const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => Category.find(),
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return Product.find(params).populate('category').populate('textFields').populate('mods');
    },
    product: async (parent, { id }) =>
      Product.findById(id).populate('category').populate('textFields').populate('mods'),

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        return user.orders.id(id);
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { orderQuantity, productID }, context) => {
      const product = await Product.findById(productID)
      if (context.user) {
        const order = new Order({ orderQuantity, product });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { orders: order },
        });

        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    addProduct: async (parent, args) => {
      console.log(args);
      category = await Category.findOne(
        { name: args.category.name},
      );
      console.log(category)
      const newProduct = await Product.create(
        {
          name: args.name,
          description: args.description,
          image: args.image,
          price: args.price,
          category: category,
        });
      return newProduct
    },
    updateProduct: async (parent, args) => {
      const product = await Product.findOneAndUpdate(
        { _id: args.product.__id },
        { $set: req.body }, 
        { runValidators: true, new: true } 
      );
    },
    addTextField: async (parent, {productID, textfield }, context) => {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: productID },
          { $addToSet: { textFields: textfield } },
          { new: true, runValidators: true }
        ).populate('category').populate('textFields').populate('mods');
        return updatedProduct;
    },
    addMod: async (parent, {productID, mod }, context) => {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productID },
        { $addToSet: { mods: mod } },
        { new: true, runValidators: true }
      ).populate('category').populate('textFields').populate('mods');
      return updatedProduct;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
