import React, { useState, useRef } from 'react'
import Togglable from './Togglable'
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogFrom = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const formRef = useRef()

    const createBlog = blog => {
        dispatch(newBlog(blog))
        dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (typeof createBlog === 'function') {
            createBlog({ title, author, url })
            setTitle('')
            setAuthor('')
            setUrl('')
            formRef.current.toggleVisibility()
        }
    }

    return (
        <Togglable ref={formRef} buttonLabel="create new blog">
            <div>
                <h2>create new</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>title:</label> <input id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        <label>author:</label> <input id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value) } />
                    </div>
                    <div>
                        <label>url:</label> <input id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value) } />
                    </div>
                    <button id="submit" type="submit">create</button>
                </form>
            </div>
        </Togglable>
    )
}

export default BlogFrom