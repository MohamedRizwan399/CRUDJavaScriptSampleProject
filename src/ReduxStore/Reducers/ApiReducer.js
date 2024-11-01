
let initialState = {
    apidata: []
}
function ApiReducer(state = initialState, action) {
    switch (action.type) {
        case 'API_DATA':
          return {apiData: action.payload}
        default:
          return state
      }
}

export default ApiReducer;