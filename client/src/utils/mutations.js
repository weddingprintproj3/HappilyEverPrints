import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const ADD_PROD = gql`
  mutation AddProduct($name: String, $description: String, $image: String, $price: Float, $category: CategoryInput, $textFields: [TextfieldInput], $groupFields: [GroupFieldInput]) {
    addProduct(name: $name, description: $description, image: $image, price: $price, category: $category, textFields: $textFields, groupFields: $groupFields) {
      _id
      category {
        _id
        name
      }
      description
      groupFields {
        fields
        group
      }
      image
      name
      price
      textFields {
        input
        label
      }
    }
  }
`;
export const ADD_ORDER = gql`
  mutation AddOrder( $productId: ID!, $orderQuantity: Int!) {
    addOrder(productID: $productId, orderQuantity: $orderQuantity) {
      _id
      orderQuantity
      product {
        name
        price
      }
      purchaseDate
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
