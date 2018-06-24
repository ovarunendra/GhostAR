import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    Image,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { SensorManager } from 'NativeModules';

import { RNCamera } from 'react-native-camera';
import timer from 'react-native-timer';

import {
    TIME_TO_NEXT_AR
} from '../constants';

import * as actions from '../actions';
import { mixins, colors, variables } from '../styles';
import * as fonts from '../fonts';

import FireLaserButton from '../components/FireLaserButton';
import TimeToComplete from '../components/TimeToComplete';
import HitScores from '../components/HitScores';
import FloatingArObject from '../components/FloatingArObject';

class ARGameDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeToStart: 3
        };
    }
    componentDidMount() {
        this.props.clearArObjects();
        this.props.resetGame();
        if (Platform.OS === 'ios') {
            // Gyroscope.stopGyroUpdates();
            // Gyroscope.setGyroUpdateInterval(0.05); // in seconds
            // DeviceEventEmitter.addListener('GyroData', this.props.updateGyroData);
        } else if (Platform.OS === 'android') {
            SensorManager.stopGyroscope();
            DeviceEventEmitter.addListener('Gyroscope', (data) => {
                const rotationRate = { rotationRate: data };
                this.props.updateGyroData(rotationRate);
            });
        }
        this.countDown();
    }
    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            // Gyroscope.stopGyroUpdates();
        } else if (Platform.OS === 'android') {
            SensorManager.stopGyroscope();
        }
        this.props.clearArObjects();
        timer.clearInterval(this, 'arObjectGenerator');
        timer.clearInterval(this, 'countdown');
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.timeToStart != this.state.timeToStart && this.state.timeToStart <= 0) {
            timer.clearInterval(this, 'countdown');
            this.handleGameStart();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {

        return (
            this.props.arExplode !== nextProps.arExplode || 
            this.state.timeToStart != nextState.timeToStart ||
            this.props.arObjects.length != nextProps.arObjects.length
        );
    }
    countDown = () => {
        timer.setInterval(this, 'countdown', () => {
            this.setState({
                timeToStart: this.state.timeToStart - 1
            });
        }, 1000);
    }
    handleGameStart = () => {
        if (Platform.OS === 'ios') {
            // Gyroscope.startGyroUpdates();
        } else if (Platform.OS === 'android') {
            SensorManager.startGyroscope(100);
        }
        this.props.subtractTimeToComplete();
        this.startArObjectTimer();
    }
    startArObjectTimer = () => {

        let timeToNextAr = Math.min(this.props.arObjects.length * 100 + TIME_TO_NEXT_AR / 2, TIME_TO_NEXT_AR);

        timer.clearInterval(this, 'arObjectGenerator');
        timer.setInterval(this, 'arObjectGenerator', () => {
            let startingPosX = Math.random() * variables.SCREEN_WIDTH * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_WIDTH * .5);
            let startingPosY = Math.random() * variables.SCREEN_HEIGHT * .75 * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_HEIGHT * .8);

            this.props.addArObject({
                imageUrl: '../assets/images/evil_dead_1.png',
                hit: false,
                startingPosX: startingPosX,
                startingPosY: startingPosY
            });
            this.startArObjectTimer();

        }, timeToNextAr);
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    <View style={styles.arDisplay}>
                        {this.props.arExplode &&
                            <Image
                                source={require('../assets/images/evil_dead_1.png')}
                                resizeMode='contain'
                                animation="fadeOut"
                                style={styles.ghostExplode}
                            />
                        }

                        {
                            this.props.arObjects.map((arObj, i) => {
                                return (
                                    <FloatingArObject
                                        key={'arObject-' + i}
                                        index={i}
                                        imageUrl={arObj.imageUrl}
                                        hit={arObj.hit}
                                        startingPosX={arObj.startingPosX}
                                        startingPosY={arObj.startingPosY}
                                    />
                                )
                            })
                        }
                        <FireLaserButton
                            showLaser
                            style={styles.fireLaserButton}
                        />
                        <FontIcon
                            name='crosshairs'
                            size={variables.CROSSHAIRS_SIZE}
                            style={styles.crosshairs}
                            color={colors.white}
                        />
                        {this.state.timeToStart > 0 &&
                            <View style={styles.countdownContainer} onPress={null}>
                                <Text style={[styles.arText, styles.instructions]}>Wake up!!</Text>
                                <Text style={[styles.arText, styles.arCounter]}>{this.state.timeToStart}</Text>
                            </View>
                        }
                        <TimeToComplete type='reset' />
                        <HitScores type='reset' />
                    </View>
                </RNCamera>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        position: 'absolute',
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    },
    arCounter: {
        ...fonts.heavyLarge,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH
    },
    arDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1
    },
    arText: {
        ...fonts.romanMedium,
        color: colors.white,
        flex: 1,
        padding: 5,
        textAlign: 'center'
    },
    countdownContainer: {
        ...mixins.column,
        ...mixins.arObject,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkGrayTransparent,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH,
        top: 0,
        left: 0
    },
    crosshairs: {
        ...mixins.arObject,
        ...mixins.column,
        justifyContent: 'center',
        top: variables.CROSSHAIRS_POSITION_TOP,
        left: variables.CROSSHAIRS_POSITION_LEFT,
        width: variables.CROSSHAIRS_SIZE,
        height: variables.CROSSHAIRS_SIZE
    },
    fireLaserButton: {
        height: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT / 2 - 20,
        left: 0
    },
    instructions: {
        position: 'absolute',
        left: 0,
        bottom: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH,
        paddingBottom: 8
    },
    ghostExplode: {
        ...mixins.arObject,
        ...mixins.column,
        justifyContent: 'center',
        top: variables.CROSSHAIRS_POSITION_TOP,
        left: variables.CROSSHAIRS_POSITION_LEFT,
        width: variables.CROSSHAIRS_SIZE,
        height: variables.CROSSHAIRS_SIZE
    }
});

//make this component available to the app
function mapStateToProps({ augmented, game }) {
    return {
        ...augmented,
        ...game
    };
}

export default connect(
    mapStateToProps,
    actions
)(ARGameDisplay);
