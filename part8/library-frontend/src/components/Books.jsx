import { useMemo, useState } from 'react'

const Books = ({ show, loading, books }) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  const genres = useMemo(() => {
    const genreSet = new Set()
    books.forEach((book) => {
      if (Array.isArray(book.genres)) {
        book.genres.forEach((genre) => genreSet.add(genre))
      }
    })
    return Array.from(genreSet)
  }, [books])

  const filteredBooks = useMemo(() => {
    if (!selectedGenre) {
      return books
    }
    return books.filter((book) => book.genres?.includes(selectedGenre))
  }, [books, selectedGenre])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
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
          {filteredBooks.map((book) => (
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
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
