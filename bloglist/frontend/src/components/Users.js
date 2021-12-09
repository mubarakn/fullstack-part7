import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const blogs = useSelector(state => state.blogs)
    console.log('blogs', blogs)
    const blogCountByUser = blogs.reduce((acc, blog) => {
        if (!acc[blog.user.name]) {
            acc[blog.user.name] = { id: blog.user.id, count: 0 }
        }
        acc[blog.user.name].count += 1
        return acc
    }, {})

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>users</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(blogCountByUser).map(user => <tr key={blogCountByUser[user].id}><td><Link to={`users/${blogCountByUser[user].id}`}>{user}</Link></td><td>{blogCountByUser[user].count}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Users