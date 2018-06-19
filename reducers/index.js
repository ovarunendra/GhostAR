import { combineReducers } from 'redux';
import augmented from './augmented';
import environment from './environment';
import game from './game';
import routes from './routes';

// export default environment;
export default combineReducers({
    augmented,
    environment,
    game,
    routes
});