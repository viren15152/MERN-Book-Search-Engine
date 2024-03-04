// setup for React and Apollo Client
import { gql } from '@apollo/client';

// Setup for User data and any saved book data
// This section of my code loads in 'SavedBooks.jsx'
export const GET_ME = gql`
  {
    me {
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