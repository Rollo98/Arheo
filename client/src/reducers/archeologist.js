import {
    ARCHEOLOGIST_EDIT,
    ARCHEOLOGIST_SAVE,
    ARCHEOLOGIST_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
    reqStatus: "",
    errorMessage: ""
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ARCHEOLOGIST_SAVE:
            return { ...state, reqStatus: action.payload, errorMessage: '' }
        case ARCHEOLOGIST_EDIT:
            return { ...state, reqStatus: action.payload, errorMessage: '' }
        case ARCHEOLOGIST_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state
    }
}