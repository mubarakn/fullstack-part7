import userService from '../services/users'

const initUsers = blogs => ({ type: 'INIT_USERS', data: blogs })

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(initUsers(users))
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export default userReducer