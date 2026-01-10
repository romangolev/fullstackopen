const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const authorId = root._id || root.id
      if (!authorId) {
        return 0
      }
      return Book.countDocuments({ author: authorId })
    },
  },
  Book: {
    author: async (root) => {
      if (root.author && root.author.name) {
        return root.author
      }
      return Author.findById(root.author)
    },
  },
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        })
        await book.save()
        await book.populate('author')
        return book
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        if (error.code === 11000) {
          throw new GraphQLError('Duplicate value violates uniqueness', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        throw error
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      try {
        author.born = args.setBornTo
        await author.save()
        return author
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        if (error.code === 11000) {
          throw new GraphQLError('Duplicate value violates uniqueness', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        throw error
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        return await user.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        if (error.code === 11000) {
          throw new GraphQLError('Duplicate value violates uniqueness', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          })
        }
        throw error
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
