import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ show, loading, books }) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  const { data: filteredData, loading: filteredLoading, refetch } = useQuery(
    BOOKS_BY_GENRE,
    {
      variables: { genre: selectedGenre || null },
      skip: !show,
    }
  )

  const genres = useMemo(() => {
    const genreSet = new Set()
    books.forEach((book) => {
      if (Array.isArray(book.genres)) {
        book.genres.forEach((genre) => genreSet.add(genre))
      }
    })
    return Array.from(genreSet)
  }, [books])

  if (!show) {
    return null
  }

  if (loading || filteredLoading) {
    return <div>loading...</div>
  }

  const visibleBooks = filteredData?.allBooks ?? []

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre)
    refetch({ genre: genre || null })
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <div>in genre {selectedGenre}</div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {visibleBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author?.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreChange('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
