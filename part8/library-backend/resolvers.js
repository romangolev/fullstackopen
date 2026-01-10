const Author = require('./models/author')
const Book = require('./models/book')

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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
}

module.exports = resolvers
