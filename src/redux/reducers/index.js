import UserReducer from './user'
import { combineReducers } from 'redux'

export default combineReducers({
    user: UserReducer,
})

// UserReducer adalah reducer yang dibuat di file user.js
// nama fild bebas