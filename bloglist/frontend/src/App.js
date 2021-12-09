import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link,  } from 'react-router-dom'
import BlogFrom from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'

import('./app.css')

const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const user = useSelector(state => state.login)

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            userService.setToken(user.token)
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
        }
    }, [user])

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Link style={{ padding: 8 }} to="/">blogs</Link>
                <Link style={{ padding: 8 }} to="/users">users</Link>
            </div>
            {notification && <div className="info">{notification}</div>}
            {!user && <LoginForm />}
            {user && <BlogFrom />}
            <h2>blogs</h2>
            <div>{user.name} logged in <button onClick={() => dispatch(logout())}>logout</button></div>
            <Switch>
                <Route exact path="/">
                    {user && <BlogList />}
                </Route>
                <Route exact path="/users">
                    <Users />
                </Route>
                <Route exact path="/users/:id">
                    <User />
                </Route>
                <Route exact path="/blogs/:id">
                    <BlogView />
                </Route>
            </Switch>
        </Router>
    )
}

export default App