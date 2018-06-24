import { ADD_AR_OBJECT, CLEAR_AR_OBJECTS, AR_EXPLODE, UPDATE_GYRO_DATA, REMOVE_AR_OBJECT } 
    from '../constants/actionTypes';
import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y
} from '../constants';

export const addArObject = (arObject) =>{
    return dispatch => {
        dispatch({
            type: ADD_AR_OBJECT,
            arObject
        });
    }
}

export const clearArObjects = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_AR_OBJECTS
        });
    }
}

export const explodeArObject = (arExplode) => {
    return dispatch => {
        dispatch({
            type: AR_EXPLODE,
            arExplode
        });
    }
}

export const updateGyroData = (gyroData) => {
    let moveX = 0;
    let moveY = 0;
    if(gyroData.rotationRate.x > GYRO_MOVE_THRESHOLD_Y || gyroData.rotationRate.x < GYRO_MOVE_THRESHOLD_Y * -1) {
        moveY = 1;
    }
    if(gyroData.rotationRate.y > GYRO_MOVE_THRESHOLD_X || gyroData.rotationRate.y < GYRO_MOVE_THRESHOLD_X * -1) {
        moveX = 1;
    }
    return dispatch => {
        dispatch({
            type: UPDATE_GYRO_DATA,
            rotationRate: gyroData.rotationRate,
            moveX,
            moveY
        });
    }
}



export const removeArObject = (arObjectIndex) => {
    return dispatch => {
        dispatch({
            type: REMOVE_AR_OBJECT,
            arObjectIndex
        });
    }
}