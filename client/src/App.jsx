// Import CSS file for styling
import './App.css';

// Import necessary components and functions from libraries
import { Outlet } from 'react-router-dom'; // Outlet is a placeholder for child routes
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'; // ApolloClient is used to connect to GraphQL API
import { setContext } from '@apollo/client/link/context'; // setContext is used to set authentication headers
import Navbar from './components/Navbar'; // Import Navbar component

// Create a HTTP link to connect to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // The GraphQL server endpoint
});

// Create a link that adds the authentication token to the request headers
const authLink = setContext((_, { headers }) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Set the 'Authorization' header with the token
    },
  };
});

// Create an ApolloClient instance to manage connections to the GraphQL server
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the authentication link and HTTP link
  cache: new InMemoryCache(), // Use an in-memory cache for storing query results
});

// Main App component wrapped in ApolloProvider to provide ApolloClient to child components
function App() {
  return (
    <ApolloProvider client={client}> {/* Provide the ApolloClient to all child components */}
      <>
        <Navbar /> {/* Render the Navbar component */}
        <Outlet /> {/* Render child routes defined by the React Router */}
      </>
    </ApolloProvider>
  );
}

export default App; // Export the App component

