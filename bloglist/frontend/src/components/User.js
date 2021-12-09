import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    const users = useSelector(state => state.users)
    const params = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = users.find(u => u.id = params.id)
        setUser(user)
    }, [users, params])

    if (!user) {
        return null
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
            </ul>
        </div>
    )
}

export default User