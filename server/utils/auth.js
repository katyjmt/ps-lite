const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ first_name, last_name, email, _id }) {
    const payload = { first_name, last_name, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
