import decode from 'jwt-decode';

class AuthService {
  // Function to set the authorization header with the token
  setAuthorizationToken(token) {
    if (token) {
      // If a token exists, set the Authorization header with the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // If no token is provided, remove the Authorization header
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  // Function to check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Middleware function to handle authentication for GraphQL requests
  graphqlAuthMiddleware(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token is provided and not expired
    if (token && !this.isTokenExpired(token)) {
      // Set the Authorization header with the token
      this.setAuthorizationToken(token);
      next(); // Continue with the next middleware or route handler
    } else {
      // If token is invalid or expired, return unauthorized status
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  // Other methods for login, logout, getProfile, etc. remain the same...
}

export default new AuthService();

