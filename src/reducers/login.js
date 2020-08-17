import { USER_DETAILS, SET_ERROR, SET_MESSAGE, REMOVE_ERROR, REMOVE_MESSAGE, START_FETCHING, END_FETCHING } from '../action/types'


const initialState = {
    data: {},
    isFetching: false,
    message: '',
    error: ''
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCHING:
            return { ...state, isFetching: true }
        case END_FETCHING:
            return { ...state, isFetching: false }
        case USER_DETAILS:
            return { ...state, data: action.payload }
        case SET_MESSAGE:
            return { ...state, message: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        case REMOVE_MESSAGE:
            return { ...state, message: '' };
        case REMOVE_ERROR:
            return { ...state, error: '' }
        default:
            return state;
    }
}

export default LoginReducer;