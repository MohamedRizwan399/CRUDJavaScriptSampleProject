import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './Reducers/CounterReducer'
import ApiReducer from './Reducers/ApiReducer';

export const store = configureStore({
    reducer: {
        counterReducer: CounterReducer,
        apiReducer: ApiReducer
    }
});

export default store;
