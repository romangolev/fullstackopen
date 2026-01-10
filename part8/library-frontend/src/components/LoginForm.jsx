import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const tokenValue = result.data.login.value
      setToken(tokenValue)
      localStorage.setItem('library-user-token', tokenValue)
      setUsername('')
      setPassword('')
      onLogin()
    }
  }, [result.data, onLogin, setToken])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await login({
      variables: { username, password },
    })
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
