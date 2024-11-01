
let initialState = {
    counterValue: 0,
}

function CounterReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'COUNTER-INCREMENT':
            console.log('increment reducer called',action?.payload)
            return {updatedValue: action.payload}
        case 'COUNTER-DECREMENT':
            console.log('decrement reducer called',action?.payload)

            return {updatedValue: action.payload}
        default:
          return state
      }
}

export default CounterReducer;