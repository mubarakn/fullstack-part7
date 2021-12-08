import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogFrom from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import('./app.css')

const App = () => {
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            dispatch(initializeBlogs())
        }
    }, [user])

    const handleLogin = async ({ username, password }) => {
        loginService
            .login({ username, password })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                setUser(user)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError('Invalid username or password')
                    setTimeout(() => { setError('') }, 5000)
                }
            })
    }

    const handleCreate = async blog => {
        dispatch(newBlog(blog))
        setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5)
    }

    const handleLike = async blog => {
        dispatch(likeBlog(blog))
    }

    const handleRemoveBlog = async blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog.id))
        }
    }

    const blogList = () => {
        return (
            <>
                <h2>blogs</h2>
                <div>{user.name} logged in <button onClick={() => {localStorage.clear(); setUser(null)}}>logout</button></div>
                {blogs.sort((a, b) => b.likes - a.likes ).map(blog => {
                    return (<Blog key={blog.id} blog={blog} like={handleLike} removeBlog={() => handleRemoveBlog(blog)} />)
                }
                )}
            </>
        )
    }

    return (
        <div>
            {notification && <div className="info">{notification}</div>}
            {error && <div className="error">{error}</div>}
            {!user && <LoginForm login={handleLogin} />}
            {user && <BlogFrom createBlog={handleCreate} />}
            {user && blogList()}
        </div>
    )
}

export default App