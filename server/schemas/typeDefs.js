const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		savedBooks: [Book]
	}
	type Book {
		_id: ID
		authors: [String]
		description: String
		image: String
		link: String
		title: String!
		bookId: String!
		comments: [Comment]!
	}
`;

module.exports = typeDefs;
