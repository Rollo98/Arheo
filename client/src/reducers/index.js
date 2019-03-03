import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import noteReducer from './note';


export default combineReducers({
    form: formReducer,
    auth: authReducer,
    note: noteReducer
});