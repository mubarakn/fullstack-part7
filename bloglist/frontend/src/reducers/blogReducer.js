import blogService from '../services/blogs'

const initBlogs = blogs => ({ type: 'INIT_BLOGS', data: blogs })

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(initBlogs(blogs))
    }
}

const create = blog => ({ type: 'NEW_BLOG', data: blog })

export const newBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.add(blog)
        dispatch(create(newBlog))
    }
}

const like = blog => ({ type: 'LIKE', data: blog })
export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.like(blog)
        dispatch(like(newBlog))
    }
}

const remove = id => ({ type: 'REMOVE', data: { id } })
export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(remove(id))
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'LIKE': {
        return state.map(blog => blog.id === action.data.id ? action.data : blog)
    }
    case 'REMOVE': {
        return state.filter(blog => blog.id !== action.data.id)
    }
    default:
        return state
    }
}

export default blogReducer