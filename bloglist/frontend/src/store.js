import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: userReducer
})

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store