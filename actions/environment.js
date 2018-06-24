import {
    CHANGE_IS_ANIMATING,
    INSTRUCTIONS_OVERLAY,
    PLAY_FIRST_TIME
} from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

export const checkFirstTimePlayed = () => async (dispatch) => {
    try {
        var firstPlay = await AsyncStorage.getItem('FIRST_TIME_PLAYED');
        if (firstPlay != null) {
            dispatch(playFirstTime());
        }
    } catch(err){
        console.log(err)
    }
}

export const storeFirstTimePlayed = () => async () => {
    try {
        await AsyncStorage.setItem('FIRST_TIME_PLAYED' , 'true');
    } catch(err){
        console.log(err)
    }
}

export const changeIsAnimating = (isAnimating) => {
    return dispatch => {
        dispatch({
            type: CHANGE_IS_ANIMATING,
            isAnimating
        });
    }
}

export const instructionsOverlay = (show) => {
    return dispatch => {
        dispatch({
            type: INSTRUCTIONS_OVERLAY,
            show
        });
    }
}

export const playFirstTime = () => {
    storeFirstTimePlayed();
    return dispatch => {
        dispatch({
            type: PLAY_FIRST_TIME
        });
    }
}

export const checkFirstPlay = () => {
    return dispatch => {
        checkFirstTimePlayed(dispatch);
    }
}