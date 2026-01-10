import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(() =>
    localStorage.getItem('library-user-token')
  )
  const client = useApolloClient()

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        loading={allAuthors.loading}
        authors={allAuthors.data ? allAuthors.data.allAuthors : []}
        canEdit={Boolean(token)}
      />

      <Books
        show={page === 'books'}
        loading={allBooks.loading}
        books={allBooks.data ? allBooks.data.allBooks : []}
      />

      <NewBook show={page === 'add' && Boolean(token)} />
      <Recommendations show={page === 'recommend' && Boolean(token)} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        onLogin={() => setPage('authors')}
      />
    </div>
  )
}

export default App
