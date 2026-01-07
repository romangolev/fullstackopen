import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author
      published
      id
    }
  }
`
const App = () => {
  const [page, setPage] = useState('authors')

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        loading={allAuthors.loading}
        authors={allAuthors.data ? allAuthors.data.allAuthors : []}
      />

      <Books
        show={page === 'books'}
        loading={allBooks.loading}
        books={allBooks.data ? allBooks.data.allBooks : []}
      />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
