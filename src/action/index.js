
const setData = (type, payload = undefined) => {
    return {
        type, payload
    }
}
const startFetching = (type) => {
    return { type }
}

const setError = (type, payload) => {
    return {
        type,
        payload
    }
}

export {
    setData,
    startFetching,
    setError
}