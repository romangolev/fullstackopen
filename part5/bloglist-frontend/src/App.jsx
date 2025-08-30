import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState([])
	const [password, setPassword] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
			blogService.getAll().then(blogs =>
	    setBlogs( blogs )
		)  
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			setUser(user)
			setUsername('')
			setPassword('')
		} catch {
			console.log('error')
		}
	}

	if (user === null) {
	return (
	<>
      <h2>Login</h2>
		<form onSubmit={handleLogin}>
			<div>
				<label>
					username           
						<input
							type="text"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>         
				</label>
			</div>
			<div>
				<label>
					password
						<input
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
				</label>
			</div>
			<button type="submit">login</button>
		</form>
		</>
	)}

	return (
        <>
			<div>
			<h2>blogs</h2>
			{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
		    </div>
			<div>
				<p>Logged in as {user.name}</p>
			</div>
		</>
	)
}

export default App
