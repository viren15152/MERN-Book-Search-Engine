const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Resolvers for GraphQL queries and mutations
const resolvers = {
    Query: {
        // Resolver for the 'me' query
        me: async (parent, args, context) => {
            // Check if user is authenticated
            if (context.user) {
                // If authenticated, find user data and return (excluding sensitive fields)
                const data = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return data;
            }
            // If not authenticated, throw an AuthenticationError
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // Resolver for the 'addUser' mutation
        addUser: async (parent, { username, email, password }) => {
            // Create a new user with provided data
            const user = await User.create({ username, email, password });
            // Generate a JWT token for the new user
            const token = signToken(user);
            // Return the token and user data
            return { token, user };
        },
        // Resolver for the 'login' mutation
        login: async (parent, { email, password }) => {
            // Find user by email
            const user = await User.findOne({ email });
            // If user not found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('User not found. Do you have an account?');
            }
            // Check if provided password is correct
            const correctPw = await user.isCorrectPassword(password);
            // If password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }
            // Generate a JWT token for the authenticated user
            const token = signToken(user);
            // Return the token and user data
            return { token, user };
        },
        // Resolver for the 'saveBook' mutation
        saveBook: async (parent, { newBook }, context) => {
            // Check if user is authenticated
            if (context.user) {
                // If authenticated, add new book to user's saved books
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: newBook }},
                    { new: true }
                );
                return updatedUser;
            }
            // If not authenticated, throw an AuthenticationError
            throw new AuthenticationError('You need to be logged in!');
        },
        // Resolver for the 'removeBook' mutation
        removeBook: async (parent, { bookId }, context) => {
            // Check if user is authenticated
            if (context.user) {
                // If authenticated, remove book from user's saved books
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            // If not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Login required!');
        },
    }
};

module.exports = resolvers;
