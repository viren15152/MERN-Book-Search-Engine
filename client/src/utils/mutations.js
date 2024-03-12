import { gql } from '@apollo/client';

// This GraphQL mutation is for logging in a user.
export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token 
      user { 
        _id 
        username 
      }
    }
  }
`;

// This GraphQL mutation is for adding a new user.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token 
      user { 
        _id 
        username
      }
    }
  }
`;

// This GraphQL mutation is for saving a book to a user's collection.
export const SAVE_BOOK = gql`
  mutation saveBook($input: BookData!) {
    saveBook(input: $input) {
      _id 
      username 
      email 
      savedBooks { 
        bookId 
        authors 
        description 
        title 
        image 
        link 
      }
    }
  }
`;

// This GraphQL mutation is for removing a book from a user's collection.
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id 
      username 
      email 
      bookCount 
      savedBooks { 
        bookId 
        authors 
        description 
        title 
        image 
        link 
      }
    }
  }
`;
