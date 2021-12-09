import loginService from '../services/login'
import { setNotification } from './notificationReducer'
const createLogin = (user) => ({ type: 'LOGIN', data: user })

export const login = credentials => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            dispatch(createLogin(user))
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setNotification('Invalid username or password', 5))
            }
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }
}

const loginReducer = (
    state = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    action) => {

    switch (action.type) {
    case 'LOGIN':
        localStorage.setItem('user', JSON.stringify(action.data))
        return action.data
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export default loginReducer