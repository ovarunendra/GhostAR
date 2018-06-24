import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { colors } from './styles';

const ReduxRouter = connect()(Router);
import reducers from './reducers';
import * as actions from './actions';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const middleware = [thunk, logger];

const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

import LandingPage from './scenes/LandingPage';
import ARGameDisplay from './scenes/ARGameDisplay';
import GameOver from './scenes/GameOver';

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

class App extends Component {
  componentWillMount() {
    this.props.checkFirstPlay();
  }
  render() {
    return (
      <ReduxRouter>
        <Stack key="root" hideNavBar sceneStyle={styles.root}>
          <Scene type='replace' key="Landing" component={LandingPage} title="LandingPage" />
          <Scene type='replace' key="ARGameDisplay" component={ARGameDisplay} title="ARGameDisplay" />
          <Scene type='replace' key="GameOver" component={GameOver} title="GameOver" />
        </Stack>
      </ReduxRouter>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

const ReduxApp = connect(mapStateToProps, actions)(App);

export default AppWrapper = () => {
  return (
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  );
};
