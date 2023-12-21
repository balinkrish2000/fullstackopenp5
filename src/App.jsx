import { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    if(user) {
      blogService.getAll(user).then(blogs =>
        setBlogs( blogs )
      )
    }  
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
    } 
    catch (exception) {
      setPassword('')
      setNotificationMessage({type: 'error', text: 'Wrong username and password'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginSection = 
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => setUserName(target.value)}/>
      </div>
      <div>
        password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">Login</button>
    </form>

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try
    {
      const newBlog = {title, author, url}
      const savedBlog = await blogService.createBlog(newBlog)
      setNotificationMessage({type: 'success', text: `a new blog ${title} by ${author} added`})
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => setNotificationMessage(null),5000)
    }
    catch{
      setNotificationMessage({type: 'error', text: 'Unable to add this Blog. Please retry'})
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const createBlogSection = 
    <form onSubmit={handleCreateBlog}>
      <h2>Create New</h2>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>

  const userInfo = () => (user['name'] + ' logged in ')
  const logoutButton = <button type='submit' onClick={handleLogout}>logout</button>
  const blogsSection = blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <div>
      <Notification message={notificationMessage}/>
      <h2>blogs</h2>
      {user === null && loginSection}
      {user !== null &&  userInfo()}
      {user !== null && logoutButton}
      <br/>
      <br/>
      {user !== null && createBlogSection}
      {user !== null &&  blogsSection}
    </div>
  )
}

export default App