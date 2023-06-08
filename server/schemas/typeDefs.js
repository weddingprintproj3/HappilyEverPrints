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

  type GroupField {
    group: String
    fields: [String]
  }

  input GroupFieldInput {
    group: String
    fields: [String]
  }
  type ModField {
    element_id: String
    posTop: String
    posLeft: String
  }

  input ModFieldInput {
    element_id: String
    posTop: String
    posLeft: String
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
    quantity: Int
    price: Float
    category: Category
    textFields: [Textfield]
    groupFields: [GroupField]
    mods: [ModField]
  }

  type Order {
    _id: ID
    orderQuantity: Int
    purchaseDate: String
    products: [Product]
    status: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    savedProducts: [Product]
  }

  type Auth {
    token: ID
    user: User
  }

  type DeleteMessage {
    message: String
  }
  type Checkout {
    session: ID
  }
  
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout: Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(productID: ID!, orderQuantity: Int!, status: String!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      currentPassword: String
    ): User
    deleteUser(password: String): DeleteMessage
    updateProduct(
      _id: ID!, 
      name: String
      description: String
      image: String
      price: Float
      category: CategoryInput
      textFields: [TextfieldInput]
      groupFields: [GroupFieldInput]
      mods: [ModFieldInput]
    ): Product
    addProduct(
      name: String
      description: String
      image: String
      price: Float
      category: CategoryInput
      textFields: [TextfieldInput]
      groupFields: [GroupFieldInput]
      mods: [ModFieldInput]
    ): Product
    deleteProduct(productID: ID!): DeleteMessage
    deleteOrder(orderId: ID!): DeleteMessage
    updateOrder: DeleteMessage
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
