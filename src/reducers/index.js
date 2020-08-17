import LoginReducer from './login'
import EventReducer from './event'
import { combineReducers } from 'redux'
import { LOGOUT } from '../action/types'


const appReducer = combineReducers({
    login: LoginReducer,
    event: EventReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        localStorage.clear();
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;