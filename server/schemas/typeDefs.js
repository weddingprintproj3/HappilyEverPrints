const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
 
  type Textfield {
    label: String
    input: String
  }
  
  input TextfieldInput {
    label: String
    input: String
  }

  type Mod {
    attribute: String
    value: String
  }

  input ModInput {
    attribute: String
    value: String
  }
  
  input CategoryInput {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
    textFields: [Textfield]
    mods: [Mod]
  }

  type Order {
    _id: ID
    orderQuantity: Int
    purchaseDate: String
    product: Product
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(productID: ID!, orderQuantity: Int!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addProduct(
      name: String
      description: String
      image: String
      price: Float
      category: CategoryInput
    ): Product
    addTextField(productID: ID!, textfield: TextfieldInput): Product
    addMod(productID: ID!, mod: ModInput): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
