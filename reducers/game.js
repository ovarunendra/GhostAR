import {
    GAME_OVER,
    ADD_SCORE,
    RESET_GAME,
    SUBTRACT_TIME
} from '../constants/actionTypes';

const initialState = {
    hitScore: 0,
    timeToComplete: 30,
    didWin: false
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GAME_OVER:
            return {
                ...state,
                didWin: action.didWin
            }
        case ADD_SCORE:
            return {
                ...state,
                hitScore: state.hitScore + 1
            }
        case RESET_GAME:
            return {
                ...state,
                didWin: false,
                hitScore: 0,
                timeToComplete: 30
            }
        case SUBTRACT_TIME:
            return {
                ...state,
                timeToComplete: state.timeToComplete - 1
            }
        default:
            return state;
    }
}