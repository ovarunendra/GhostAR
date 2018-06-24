import {
    CHANGE_IS_ANIMATING,
    INSTRUCTIONS_OVERLAY,
    PLAY_FIRST_TIME
} from '../constants/actionTypes';

const initialState = {
    isAnimating: false,
    showInstructionsOverlay: false,
    firstPlay: true
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_IS_ANIMATING:
            return {
                ...state,
                isAnimating: action.isAnimating
            }
        case INSTRUCTIONS_OVERLAY:
            return {
                ...state,
                showInstructionsOverlay: action.show
            }
        case PLAY_FIRST_TIME:
            return {
                ...state,
                firstPlay: false
            }
        default:
            return state;
    }
}