import {
    NOTE_EDIT,
    NOTE_SAVE,
    NOTE_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
    reqStatus: "",
    errorMessage: ""
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case NOTE_SAVE:
            return { ...state, reqStatus: action.payload, errorMessage: '' }
        case NOTE_EDIT:
            return { ...state, reqStatus: action.payload, errorMessage: '' }
        case NOTE_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state
    }
}