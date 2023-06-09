import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $name: String) {
    products(category: $category, name: $name) {
      _id
      name
      description
      price
      image
      category {
        _id
        name
      }
      textFields {
        label
        input
      }
      mods {
        attribute
        value
      }
    }
  }
`;

export const QUERY_SINGLE_PRODUCTS = gql`
  query Product($id: ID!) {
    product(_id: $id) {
      textFields {
        label
        input
      }
      price
      name
      image
      groupFields {
        group
        fields
      }
      description
      category {
        name
        _id
      }
      mods {
        element_id
        posTop
        posLeft
      }
      _id
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout {
    checkout {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
          category {
            _id
            name
          }
        }
        status
        orderQuantity
      }
      savedProducts {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
          name
        }
      }
    }
  }
`;
