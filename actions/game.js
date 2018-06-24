import {
    ADD_SCORE,
    GAME_OVER,
    RESET_GAME,
    SUBTRACT_TIME 
} from '../constants/actionTypes';

export const addHitScore = () => {
    return dispatch => {
        dispatch({
            type: ADD_SCORE
        });
    } 
}

export const gameOver = (didWin) => {
    return dispatch => {
        dispatch({
            type: GAME_OVER,
            didWin
        });
    }
}

export const resetGame = () => {
    return dispatch => {
        dispatch({
            type: RESET_GAME
        });
    }
}

export const subtractTimeToComplete = () => {
    return dispatch => {
        dispatch({
            type: SUBTRACT_TIME
        });
    }
}