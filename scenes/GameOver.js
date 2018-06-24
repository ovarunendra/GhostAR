import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

import Button from '../components/Button';
import HitScores from '../components/HitScores';
import TimeToComplete from '../components/TimeToComplete';

import {
    Actions
} from 'react-native-router-flux';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

import { playSound } from '../scripts/sounds';

import * as actions from '../actions';

class GameOver extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        this.props.resetGame();
        this.props.clearArObjects();
    }
    componentDidMount() {
        if (this.props.didWin) {
            playSound('win');
        } else {
            playSound('lose');
        }
    }
    handlePlayAgain() {
        Actions.ARGameDisplay({ type: 'reset' });
    }
    render() {
        let imagePath;
        let gameOverText;

        if (this.props.didWin) {
            imagePath = require('../assets/images/world_peace.jpg');
            gameOverText = 'Congratulations, you\'ve defeated ghosts Army!';
        } else {
            imagePath = require('../assets/images/end_of_world_4.jpg');
            gameOverText = '"TRY" again!';
        }

        return (
            <View style={styles.root}>
                <Image
                    style={styles.backgroundImage}
                    source={imagePath}
                />

                <HitScores paused type='reset' />
                <TimeToComplete paused type='reset' />

                <View style={styles.contentContainer}>
                    <Text style={styles.gameOverText}>{gameOverText}</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            rounded
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={this.handlePlayAgain}
                            color={colors.red}
                        >
                            Play Again
                        </Button>
                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column,
        ...mixins.center
    },
    buttonContainer: {
        ...mixins.row
    },
    button: {
        ...buttons.play,
        flex: 1,
        marginHorizontal: variables.SCREEN_WIDTH * .05,
        marginVertical: variables.SCREEN_HEIGHT * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .02,
        paddingHorizontal: variables.SCREEN_WIDTH * .1
    },
    buttonText: {
        ...fonts.romanSmall
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    },
    contentContainer: {
        ...mixins.column,
        marginTop: variables.SCREEN_HEIGHT * .25
    },
    gameOverText: {
        ...fonts.romanMedium,
        color: colors.white,
        textAlign: 'center',
        backgroundColor: colors.darkGrayTransparent,
        width: variables.SCREEN_WIDTH,
        padding: variables.SCREEN_WIDTH * .05
    }
});

function mapStateToProps({ game }) {
    return {
        ...game
    };
}

export default connect(
    mapStateToProps,
    actions
)(GameOver);