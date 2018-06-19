import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { colors } from './styles';

const ReduxRouter = connect()(Router);
import reducers from './reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const middleware = [thunk, logger];

const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

import LandingPage from './scenes/LandingPage';
import CameraScene from './scenes/CameraScene';

const styles = StyleSheet.create({
  root: {
      flex: 1
  },
  navBar: {
      backgroundColor: colors.transparent
  }
});

const App = () => (
  <ReduxRouter>
    <Stack key="root" hideNavBar sceneStyle={styles.root}>
      <Scene key="landing" component={LandingPage} title="LandingPage" />
      <Scene key="camera" component={CameraScene} title="CameraScene" />
    </Stack>
  </ReduxRouter>
);

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
      // checkFirstPlay: () => dispatch(checkFirstPlay()),
  };
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppWrapper = () => {
  return (
      <Provider store={store}>
          <ReduxApp />
      </Provider>
  );
};
