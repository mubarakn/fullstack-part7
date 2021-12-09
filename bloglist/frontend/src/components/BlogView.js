import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, commentBlog } from '../reducers/blogReducer'

const BlogView = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(b => b.id = params.id)

    const handleLike = () => {
        const newBlog = { ...blog, ...{ likes: blog.likes + 1 } }
        dispatch(likeBlog(newBlog))
    }

    if (!blog) {
        return null
    }

    const handleCommentSubmit = event => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        dispatch(commentBlog(blog.id, comment))
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
            <div>added by {blog.author}</div>

            <h4>comments</h4>
            <form onSubmit={handleCommentSubmit}>
                <input type="comment" name="comment" />
                <button type="submit">add comment</button>
            </form>

            {blog.comments && blog.comments.length && (
                <ul>
                    {blog.comments.map(c => <li key={c._id}>{c.comment}</li>)}
                </ul>
            )}
        </div>
    )
}

export default BlogView