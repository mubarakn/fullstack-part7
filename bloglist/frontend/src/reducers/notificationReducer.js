const createNotification = notification => ({ type: 'SET_NOTIFICATION', data: notification })

export const setNotification = (notification, seconds) => {
    console.log('setNotification', notification, seconds)
    return async dispatch => {
        dispatch(createNotification(notification))
        setTimeout(() => {
            dispatch(({ type: 'CLEAR_NOTIFICATION' }))
        }, seconds * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'CLEAR_NOTIFICATION':
        return ''
    default:
        return state
    }
}

export default notificationReducer