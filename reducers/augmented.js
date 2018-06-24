import {
    ADD_AR_OBJECT,
    AR_EXPLODE,
    CLEAR_AR_OBJECTS,
    REMOVE_AR_OBJECT,
    UPDATE_GYRO_DATA
} from '../constants/actionTypes';
import {
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../constants';

const initialState = {
    arExplode: false,
    arObjects: [
    ],
    gyroX: 0,
    gyroY: 0,
    xOffset: 0,
    yOffset: 0
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_AR_OBJECT:
            return {
                ...state,
                arObjects: [
                    ...state.arObjects,
                    action.arObject
                ]
            }
        case AR_EXPLODE:
            return {
                ...state,
                arExplode: action.arExplode
            }
        case CLEAR_AR_OBJECTS:
            return {
                arExplode: false,
                arObjects: [],
                gyroX: 0,
                gyroY: 0,
                xOffset: 0,
                yOffset: 0
            }
        case REMOVE_AR_OBJECT:
            return {
                ...state,
                arObjects: [
                    ...state.arObjects.slice(0, action.arObjectIndex),
                    ...state.arObjects.slice(action.arObjectIndex + 1)
                ]
            }
        case UPDATE_GYRO_DATA:
            return {
                ...state,
                gyroX: action.rotationRate.x,
                gyroY: action.rotationRate.y,
                xOffset: state.xOffset + (action.moveX * (MOVE_FACTOR_X * action.rotationRate.y)),
                yOffset: state.yOffset + (action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x))
            }
        default:
            return state;
    }
}