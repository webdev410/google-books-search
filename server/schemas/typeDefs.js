const { gql } = require("apollo-server-express");
const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		bookCount: Int
		savedBooks: [Book]
	}
	type Book {
		bookId: String!
		title: String!
		authors: [String]
		description: String!
		image: String
		link: String
	}
	type Auth {
		token: ID!
		user: User
	}
	type Query {
		users: [User]
		getSingleUser(user: String!): User
		me: User
	}
	input SaveBook {
		authors: [String]
		title: String
		description: String
		bookId: String
		image: String
		link: String
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(
			authors: [String]
			title: String
			description: String
			bookId: String
			image: String
			link: String
		): User
		removeBook(bookId: String!): User
	}
`;

module.exports = typeDefs;
