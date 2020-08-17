import { SET_EVENTS, SET_MESSAGE, REMOVE_MESSAGE, REMOVE_ERROR, SET_ERROR, START_FETCHING, END_FETCHING } from '../action/types'


const initialState = {
    events: { data: [], count: 0 },
    isFetching: false,
    message: '',
    error: ''
}

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCHING:
            return { ...state, isFetching: true }
        case END_FETCHING:
            return { ...state, isFetching: false }
        case SET_EVENTS:
            return {
                ...state, events: { ...state.events, data: action.payload.data, count: action.payload.count }
            };
        case SET_MESSAGE:
            return { ...state, message: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload, events: { ...state.events, data: [], count: 0 } }
        case REMOVE_MESSAGE:
            return { ...state, message: '' };
        case REMOVE_ERROR:
            return { ...state, error: '' }
        default:
            return state;
    }
}

export default EventReducer;