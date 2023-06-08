const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const resolvers = {
  Query: {
    categories: async () => Category.find(), // get all the categories
    // get all product and if name or category filter are provided return only product that match the criteria
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

      return Product.find(params).populate('category').populate('textFields').populate('groupFields').populate('mods');
    },
    product: async (parent, { _id }) => { // get product by id and get any field or placement modifications
      const product = await Product.findById(_id).populate('category').populate('textFields').populate('groupFields').populate('mods');
      return product;
    },
    // get the current logged in user data, include their orders and saved products
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders.products',
            populate: 'category',
          })
          .populate({
            path: 'savedProducts',
            populate: 'category',
          });;
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    // get an order by ID
    order: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id)
          .populate({
            path: 'orders.products',
            populate: 'category',
          })

        return user.orders.id(id);
      }

      throw new AuthenticationError('Not logged in');
    },
    // create a tripe order and return a session id
    checkout: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      // get url of domain
      const url = new URL(context.headers.referer).origin;
      const line_items = [];
      // get all the order pertaining to the current logged in user
      const { orders } = await User.findById(context.user._id)
        .populate('orders')
        .populate('savedProducts');

      for (let i = 0; i < orders.length; i++) {

        // completed order persist in Users.orders in order to have order history
        // we need to ensure we only get orders that have not been completed
        if (orders[i].status === 'PENDING') {

          quantity = orders[i].orderQuantity
          products = orders[i].products
          for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i])
            const stripeProduct = await stripe.products.create({
              name: product.name,
            });

            const price = await stripe.prices.create({
              product: stripeProduct.id,
              unit_amount: product.price * 100,
              currency: 'cad',
            });

            line_items.push({
              price: price.id,
              quantity: quantity
            });

          }
        }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };// return the session id for stripe
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // create an order and then push the order to the logged in users orders field
    addOrder: async (parent, { orderQuantity, productID, status }, context) => {
      const product = await Product.findById(productID)
      if (context.user) {
        const order = new Order({ orderQuantity, products: productID, status });
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
    // user update
    updateUser: async (parent, args, context) => {
      if (context.user) {
        let updatedUser = {};
        if (args.firstName && args.firstName.length > 0) {
          updatedUser.firstName = args.firstName;
        }
        if (args.lastName && args.lastName.length > 0) {
          updatedUser.lastName = args.lastName;
        }
        
        // checking if both email and password are provided to indicate an email change
        if (args.email && args.email.length > 0) {
          if (!args.password || args.password.length < 1) {
            throw new AuthenticationError('Please provide your current password');
          }
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          updatedUser.email = args.email;
          return User.findByIdAndUpdate(context.user._id, updatedUser, {
            new: true,
          });
        }

        //checking if both current password and new password are provided to indicate a password change
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
    // delete you account
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
    // since products are customized a product is only created when a user is done modifications and has saved
    // every product then belongs to a user and therefore is assigned at creation
    //create a product and then add the product to the current users savedProducts
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
            textFields: args.textFields,
            groupFields: args.groupFields,
            mods: args.mods
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
    // delete the product and remove the ID from the user's saved products
    deleteProduct: async (parent, args, context) => {
      await Product.findByIdAndDelete(args.productID);

      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, { $pull: { savedProducts: args.productID } });
        return { message: 'Product deleted successfully' };
      }
      throw new AuthenticationError('Not logged in');

    },
    // there is no actual order object therefore to delete an order we need to pull the order
    // from the user's orders
    deleteOrder: async (parent, args, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, { $pull: { orders: { _id: args.orderId } } }); // pull order that matches id

        return { message: 'Order deleted successfully' };
      }
      throw new AuthenticationError('Not logged in');
    },
    // once and order has been purchased we change the status from PENDING to COMPLETED
    // this allows us to have an order history attached to the user
    updateOrder: async (parent, args, context) => {
      if (context.user) {
        // get all existing PENDING orders and change them to COMPLETED
        await User.updateOne({ _id: context.user._id, "orders.status": "PENDING" }, {
          '$set': {
            'orders.$.status': 'COMPLETED',
          }
        });
        return { message: 'orders updated' };
      }
      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
