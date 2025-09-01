import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState([])
	const [password, setPassword] = useState([])
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
			setAllBlogs()
		}
	}, [])

	const setAllBlogs = () => {
            blogService.getAll().then(blogs =>
            setBlogs( blogs )
            ) 
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem(
				'loggedBlogsappUser', JSON.stringify(user)
			) 
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (err) {
			console.log(err)
		}
	}

	const handleLogout = () => {
		try {
			setUser(null)
			window.localStorage.removeItem('loggedBlogsappUser') 
			setUsername('')
			setPassword('')
		} catch (err) {
			console.log(err)
		}
	}
    
    const handleNewblog = async (event) => {
		event.preventDefault()
		try {
			await blogService.create({title, author, url}) 
			setTitle('')
			setAuthor('')
			setUrl('')
			setBlogs([])
			setAllBlogs()
		} catch (err) {
			console.log(err)
		}
	}

	const loginForm = () => (
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
	)

	const createnewForm = () => (
		<>
			<h2>create new</h2>
			<form onSubmit={handleNewblog}>
				<div>
					<label>
						title:
							<input
								type="text"
								value={title}
							    onChange={({ target }) => setTitle(target.value)}
							/>
					</label>
				</div>
				<div>
					<label>
						author:
							<input
								type="text"
								value={author}
							    onChange={({ target }) => setAuthor(target.value)}
							/>
					</label>
				</div>
				<div>
					<label>
						url:
							<input
								type="text"
								value={url}
							    onChange={({ target }) => setUrl(target.value)}
							/>
					</label>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	)

    const blogForm = () => (
		<>
			<div>
				<p>Logged in as {user.name} 
				<button onClick={handleLogout}>logout</button>
				</p>
			</div>
			<div>
			{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
		    </div>
		</>
	)

	return (
        <>
			<h2>blogs</h2>
			{!user && loginForm()}
			{user && (
				<>
					{createnewForm()}
					{blogForm()}
				</>
			)}
		</>
	)
}

export default App
