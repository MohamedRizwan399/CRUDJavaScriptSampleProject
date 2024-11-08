export const updateCounterAction = (type = "", updatedValue) => {
    return {
        type: type,
        payload: updatedValue,
    }
}

export const storeApiDataAction = (apiData) => {
    return {
        type: 'API_DATA',
        payload: apiData,
    }
}

// export const storeApiDataAction = (apiData) => dispatch => {
//     dispatch({
//         type: 'API_DATA',
//         payload: apiData,
//     })
// }