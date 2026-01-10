import { useQuery } from '@apollo/client/react'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = ({ show }) => {
  const { data: userData, loading: userLoading } = useQuery(ME, {
    skip: !show,
  })

  const favoriteGenre = userData?.me?.favoriteGenre

  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre || !show,
  })

  if (!show) {
    return null
  }

  if (userLoading || booksLoading) {
    return <div>loading...</div>
  }

  const books = booksData?.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      {favoriteGenre && (
        <div>books in your favorite genre {favoriteGenre}</div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author?.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
