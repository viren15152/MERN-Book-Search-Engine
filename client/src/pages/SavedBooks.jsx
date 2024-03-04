import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  // Use useQuery hook to fetch user data
  const { loading, data } = useQuery(GET_ME);
  
  // Use useMutation hook to remove a book
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  
  // Extract user data from query result
  const userData = data?.me || {};

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    // Get token if user is logged in
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Remove book using removeBook mutation
      const response = await removeBook({ variables: { bookId } });
      console.log('Deleted record: ', response);
      
      // Handle errors
      if (error) {
        console.log(error);
      }
      
      // Remove book ID from local storage
      removeBookId(bookId);
    } catch (err) {
      // Log any caught errors
      console.error(err);
    }
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container>
      <h2>
        {userData.savedBooks.length
          ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <CardColumns>
        {userData.savedBooks.map((book) => {
          return (
            <Card key={book.bookId} border='dark'>
              {/* Display book image if available */}
              {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
              <Card.Body>
                {/* Display book title */}
                <Card.Title>{book.title}</Card.Title>
                {/* Display book authors */}
                <p className='small'>Authors: {book.authors}</p>
                {/* Display book description */}
                <Card.Text>{book.description}</Card.Text>
                {/* Button to delete book */}
                <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  );
};

export default SavedBooks;

