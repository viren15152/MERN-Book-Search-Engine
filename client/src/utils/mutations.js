import { gql } from '@apollo/client';

// This GraphQL mutation is for logging in a user.
export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token // The token returned upon successful login
      user { // Information about the logged-in user
        _id // Unique identifier of the user
        username // Username of the user
      }
    }
  }
`;

// This GraphQL mutation is for adding a new user.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token // The token returned upon successful registration
      user { // Information about the registered user
        _id // Unique identifier of the user
        username // Username of the user
        email // Email of the user
        bookCount // Number of books saved by the user
        savedBooks { // Array of books saved by the user
          bookId // Unique identifier of the book
          authors // Authors of the book
          description // Description of the book
          title // Title of the book
          image // Image URL of the book
          link // Link to the book
        }
      }
    }
  }
`;

// This GraphQL mutation is for saving a book to a user's collection.
export const SAVE_BOOK = gql`
  mutation saveBook($input: BookData!) {
    saveBook(input: $input) {
      _id // Unique identifier of the user
      username // Username of the user
      email // Email of the user
      savedBooks { // Array of books saved by the user after adding the new book
        bookId // Unique identifier of the book
        authors // Authors of the book
        description // Description of the book
        title // Title of the book
        image // Image URL of the book
        link // Link to the book
      }
    }
  }
`;

// This GraphQL mutation is for removing a book from a user's collection.
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id // Unique identifier of the user
      username // Username of the user
      email // Email of the user
      bookCount // Updated number of books saved by the user after removing the book
      savedBooks { // Array of books saved by the user after removing the specified book
        bookId // Unique identifier of the book
        authors // Authors of the book
        description // Description of the book
        title // Title of the book
        image // Image URL of the book
        link // Link to the book
      }
    }
  }
`;
