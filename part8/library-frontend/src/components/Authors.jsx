import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, loading, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (!name && authors.length) {
      setName(authors[0].name)
    }
  }, [authors, name])

  const authorOptions = useMemo(
    () =>
      authors.map((author) => ({
        value: author.name,
        label: author.name,
      })),
    [authors]
  )

  const selectedAuthor =
    authorOptions.find((option) => option.value === name) || null

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!name || !born) {
      return
    }

    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedAuthor}
            onChange={(option) => setName(option ? option.value : '')}
            options={authorOptions}
            placeholder="Select author"
            styles={{
              container: (base) => ({ ...base, width: '200px' }),
            }}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
