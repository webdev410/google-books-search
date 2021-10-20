import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($bookId: String) {
		saveBook(
			authors: $authors
			title: $title
			description: $description
			bookId: $bookId
			image: $image
			link: $link
		) {
			_id
			authors
			title
			description
			bookId
			image
			link
		}
	}
`;
export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: String) {
		removeBook(bookId: $bookId) {
			_id
			authors
			title
			description
			bookId
			image
			link
		}
	}
`;
