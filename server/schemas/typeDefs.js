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
    groupFields: [GroupField]
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
    updateProduct(
      _id: ID!, 
      name: String
      description: String
      image: String
      price: Float
      category: CategoryInput
      textFields: [TextfieldInput]
      groupFields: [GroupFieldInput]
    ): Product
    addProduct(
      name: String
      description: String
      image: String
      price: Float
      category: CategoryInput
      textFields: [TextfieldInput]
      groupFields: [GroupFieldInput]
    ): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
