const Book = require('../models/Book');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//requires models to be able to use them in resolvers

//creating resolvers for queries and mutations
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })

                return userData;
            } else {
                throw new AuthenticationError('Not logged in');
            }
        },
        books: async () => {
            return Book.find();
        }
    },
    Mutation: {
        createbook: async (parent, { bookData }) => {
            const book = await Book.create(bookData);
            return book;
        },
        updatebook: async (parent, { bookId, bookData }) => {
            const book = await Book.update(bookId, bookData);
        },
        deletebook: async (parent, { bookID }) => {
            const book = await Book.deleteOne(bookID);
        },
        createUser: async (parent, { username, email, password }) => {
            const encryptPassword = bcrypt.encrypt(password, 10);
            const user = await User.create(({ username, email, encryptPassword }));
        },
        deleteUser: async (parent, { username }) => {
            const user = await User.deleteOne(username);
        },
        login: async (parent, { email, password }) => {
            const user = User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            else {
                const correctPw = await bcrypt.compare(password, user.password);
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }
                return { token: jwt.signToken(user), user };
            }
        },
        logout: async (parent, args, context) => {
            if (context.user) {
                context.logout();
                return true;
            }
            else {
                throw new AuthenticationError('Not logged in');
            }
        },

    }

}




module.exports = resolvers;