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

export const DELETE_PROD = gql`
  mutation DeleteProduct($productID: ID!) {
    deleteProduct(productID: $productID) {
      message
    }
  }
`;
export const ADD_ORDER = gql`
  mutation AddOrder( $productId: ID!, $orderQuantity: Int!, $status: String!) {
    addOrder(productID: $productId, orderQuantity: $orderQuantity, status: $status) {
      _id
      orderQuantity
      product {
        name
        price
      }
      purchaseDate
      status
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

export const UPDATE_USER = gql`
  mutation UpdateUser($firstName: String, $lastName: String, $email: String, $password: String, $currentPassword: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, currentPassword: $currentPassword) {
      _id
      firstName
      lastName
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($password: String) {
    deleteUser(password: $password) {
      message
    }
  }
`