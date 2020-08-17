import { START_FETCHING, END_FETCHING, SET_ERROR, SET_MESSAGE, USER_DETAILS } from '../action/types'
import store from '../store'
import Api from '../utils/api/api';
import { baseUrl, baseLogin, loginEndPoint, signupEndPoint } from '../utils/api/apiPath';
import { setData, setError, startFetching } from '../action'

const logIn = (body) => {

    store.dispatch(startFetching(START_FETCHING));
    return async (dispatch, getState) => {
        try {
            const url = `${baseUrl}${baseLogin}${loginEndPoint}`
            const { data, headers } = await Api.post(url, body);
            if (data.success && data.payload) {
                localStorage.setItem('user', headers.authorization)
                dispatch(setData(USER_DETAILS, data.payload))
            }
            else if (!data.success && data.message)
                dispatch(setError(SET_ERROR, data.message))
            dispatch(startFetching(END_FETCHING))
        }
        catch (error) {
            dispatch(startFetching(END_FETCHING))
            dispatch(setError(SET_ERROR, 'Something Went Wrong'))
        }
    }
}

const signUp = (body) => {
    store.dispatch(startFetching(START_FETCHING))
    return async (dispatch, getState) => {
        try {
            const url = `${baseUrl}${baseLogin}${signupEndPoint}`
            debugger
            const { data, headers } = await Api.post(url, body);
            if (data.success && data.payload) {
                dispatch(setData(USER_DETAILS, data.payload))
                localStorage.setItem('user', headers.authorization)
            }
            else if (!data.success && data.message)
                dispatch(setError(SET_ERROR, data.message))
            dispatch(startFetching(END_FETCHING))
        }
        catch (error) {
            dispatch(startFetching(END_FETCHING))
            dispatch(setError(SET_ERROR, 'Something Went Wrong'))
        }
    }
}

export { logIn, signUp }