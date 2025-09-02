import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'  
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notificationmsg, setNotificationmsg] = useState(null)

	useEffect(() => {
		setAllBlogs()
		const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const setAllBlogs = () => {
            blogService.getAll().then(blogs =>
            setBlogs( blogs )
            ) 
	}

	const handleLogout = () => {
		try {
			setUser(null)
			window.localStorage.removeItem('loggedBlogsappUser') 
		} catch (err) {
			console.log(err)
		}
	}

	const showNotification = (msg) => {
		setNotificationmsg(msg)
		setTimeout(() => {setNotificationmsg(null)}, 5000)
	}


    const blogForm = () => (
		<>
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
			<Notification notification={notificationmsg} />
			{!user && <LoginForm 
							onSuccess={setUser} 
							showNotification={showNotification} />}	
			{user && (
				<>
		 			<div>
   		 				<p>Logged in as {user.name} 
   		 				<button onClick={handleLogout}>logout</button>
   		 				</p>
   		 			</div>
					<NewBlogForm
						setAllBlogs={setAllBlogs}
						showNotification={showNotification} />
				</>
			)}
			{blogForm()}
		</>
	)
}

export default App
