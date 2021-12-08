import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    blogs: blogReducer
})

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store