import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
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
			<BlogForm blogs={blogs} />
		</>
	)
}

export default App
