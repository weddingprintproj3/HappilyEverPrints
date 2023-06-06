const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('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');
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

      return Product.find(params).populate('category').populate('textFields').populate('groupFields');
    },
    product: async (parent, { _id }) => {
      const product = await Product.findById(_id).populate('category').populate('textFields').populate('groupFields')
      return product;
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('orders')
          .populate('savedProducts');
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
    checkout: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const url = new URL(context.headers.referer).origin;
      console.log(url);
      const line_items = [];
      const {orders} = await User.findById(context.user._id)
          .populate('orders')
          .populate('savedProducts');
      
      for (let i = 0; i < orders.length; i++) {
        quantity =  orders[i].orderQuantity
        products = orders[i].products
        for (let i = 0; i < products.length; i++) {
          const product = await Product.findById(products[i])
          console.log(product.name)
          const stripeProduct = await stripe.products.create({
            name: product.name,
            // description: product.description,
            // images: [`${url}${product.image}`]
          });
          console.log(product.price)
          const price = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: product.price * 100,
            currency: 'cad',
          });

          line_items.push({
            price: price.id,
            quantity: quantity
          });
          console.log(line_items)
        }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      console.log(session)
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { orderQuantity, productID, status }, context) => {
      const product = await Product.findById(productID)

      if (context.user) {
        const order = new Order({ orderQuantity, products:productID,status } );
        //await Order.findByIdAndUpdate(order._id,{ $addToSet: { products: product._id } })

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        let updatedUser = {};
        if (args.firstName && args.firstName.length > 0) {
          updatedUser.firstName = args.firstName;
        }
        if (args.lastName && args.lastName.length > 0) {
          updatedUser.lastName = args.lastName;
        }
        if (args.email && args.email.length > 0) {
          updatedUser.email = args.email;
        }
        //checking if password is being updated
        if (args.password && args.password.length > 0 && args.currentPassword && args.currentPassword.length > 0) {
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.currentPassword);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          updatedUser.password = await user.hashPassword(args.password);
        }

        return User.findByIdAndUpdate(context.user._id, updatedUser, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        if (args.password && args.password.length > 0) {
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          await User.findByIdAndDelete(context.user._id);
          return { message: 'Your account has been deleted!' };
        }
      };
    },
    addProduct: async (parent, args, context) => {

      category = await Category.findOne(
        { name: args.category.name },
      );
      if (context.user) {
        const newProduct = await Product.create(
          {
            name: args.name,
            description: args.description,
            image: args.image,
            price: args.price,
            category: category,
            textFields:args.textFields,
            groupFields:args.groupFields,
            mods:args.mods    
        });
        await User.findByIdAndUpdate(context.user._id, { $push: { savedProducts: newProduct } });
        return newProduct;

      }
      throw new AuthenticationError('Not logged in');    
    },
    updateProduct: async (parent, args, context) => {
      const product = await Product.findOneAndUpdate(
        { _id: args.product._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    },
    deleteProduct: async (parent, args, context) => {
      await Product.findByIdAndDelete(args.productID);
      console.log('Product deleted')
      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, { $pull: { savedProducts: args.productID } });
        return { message: 'Product deleted successfully' };
      }
      throw new AuthenticationError('Not logged in');

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
