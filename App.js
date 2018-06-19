import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import LandingPage from './scenes/LandingPage';
import CameraScene from './scenes/CameraScene';

const App = () => (
  <Router>
    <Stack key="root" hideNavBar >
      <Scene key="landing" component={LandingPage} title="LandingPage" />
      <Scene key="camera" component={CameraScene} title="CameraScene" />
    </Stack>
  </Router>
);

export default App;
