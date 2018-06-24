import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from '../components/Button';
import InstructionsOverlay from '../components/InstructionsOverlay';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

import { instructionsOverlay } from '../actions/environment';

class LandingPage extends Component {

    handlePlay = () => {
        if(this.props.firstPlay) {
            this.props.instructionsOverlay(true);
        } else {
            Actions.ARGameDisplay();
        }
    }

    render() {
        const { showInstructionsOverlay } = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.overlay}>
                    <Text style={styles.header}>GHOST AR</Text>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/alien.png')} />
                    <Button
                        rounded
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.handlePlay}
                        color={colors.red}
                    >
                        Play
                    </Button>
                    <Text
                        style={styles.howToPlay}
                        onPress={this.props.instructionsOverlay.bind(this, true)}
                    >
                        How to Play
                    </Text>
                    { showInstructionsOverlay && <InstructionsOverlay /> }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column,
        ...mixins.center,
        backgroundColor: colors.darkGray
    },
    button: {
        ...buttons.play,
        marginVertical: variables.SCREEN_HEIGHT * .12,
    },
    header: {
        ...fonts.romanLarge,
        color: colors.white,
        marginTop: variables.SCREEN_HEIGHT * .08
    },
    howToPlay: {
        ...fonts.romanSmall,
        color: colors.white,
        padding: 15,
        marginVertical: variables.SCREEN_HEIGHT * .04
    },
    image: {
        marginTop: variables.SCREEN_HEIGHT * .04,
        height: variables.SCREEN_HEIGHT * .18,
        width: variables.SCREEN_HEIGHT * .18
    },
    overlay: {
        ...mixins.column,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    }
});

function mapStateToProps({ environment }) {
    return {
        ...environment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        instructionsOverlay: (show) => dispatch(instructionsOverlay(show))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);
