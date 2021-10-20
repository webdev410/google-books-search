const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		users: async () => {
			return User.find();
		},
		// get a single user by either their id or their username
		async getSingleUser({ user = null, params }, res) {
			const foundUser = await User.findOne({
				$or: [
					{ _id: user ? user._id : params.id },
					{ username: params.username },
				],
			});

			if (!foundUser) {
				return res
					.status(400)
					.json({ message: "Cannot find a user with this id!" });
			}

			res.json(foundUser);
		},

		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id }).populate(
					"thoughts"
				);
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError(
					"No user found with this email address"
				);
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const token = signToken(user);
			return { token, user };
		},
		async saveBook({ user, body }, res) {
			console.log(user);
			try {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id },
					{ $addToSet: { savedBooks: body } },
					{ new: true, runValidators: true }
				);
				return res.json(updatedUser);
			} catch (err) {
				console.log(err);
				return res.status(400).json(err);
			}
		},
		async removeBook({ user, params }, res) {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $pull: { savedBooks: { bookId: params.bookId } } },
				{ new: true }
			);
			if (!updatedUser) {
				return res
					.status(404)
					.json({ message: "Couldn't find user with this id!" });
			}
			return res.json(updatedUser);
		},
	},
};

module.exports = resolvers;
