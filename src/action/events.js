import { START_FETCHING, SET_EVENTS, SET_ERROR, END_FETCHING, GET_EVENTS, SET_MESSAGE } from './types'
import { startFetching, setData, setError } from './index'
import store from '../store'
import Api from '../utils/api/api';
import { baseUrl, baseEvent } from '../utils/api/apiPath'
import { pageSize } from '../utils/global';


const getEvents = (pageSize, pageNumber, fromDate = undefined, toDate = undefined) => {
    store.dispatch(startFetching(START_FETCHING));
    return async (dispatch, getState) => {
        try {
            const params = { pageSize, pageNumber, fromDate, toDate }
            const { data } = await Api.get(`${baseUrl}${baseEvent}`, params);
            if (data.success)
                dispatch(setData(SET_EVENTS, data.payload))
            else
                dispatch(setError(SET_ERROR, data.message))
            dispatch(startFetching(END_FETCHING))
        }
        catch (error) {
            dispatch(startFetching(END_FETCHING))
            dispatch(setError(SET_ERROR, 'Something went wrong. Please try again later'))
        }
    }
}

const addEvents = (events) => {
    store.dispatch(startFetching(START_FETCHING));
    return async (dispatch, getState) => {
        try {
            const url = `${baseUrl}${baseEvent}`;
            const { data } = await Api.post(url, events);
            debugger;
            if (data.success) {
                dispatch(setData(SET_MESSAGE, data.message))
                dispatch(getEvents(pageSize, 1))
            }
            else
                dispatch(setError(SET_ERROR, data.message))
            dispatch(startFetching(END_FETCHING))
        }
        catch (error) {
            dispatch(startFetching(END_FETCHING))
            dispatch(setError(SET_ERROR, 'Something went wrong. Please try again later'))
        }
    }
}

export { getEvents, addEvents }