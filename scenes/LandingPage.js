//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Button from '../components/Button';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

// create a component
class LandingPage extends Component {
    render() {
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
                    >
                        How to Play
                    </Text>
                </View>
            </View>
        );
    }
}

// define your styles
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

//make this component available to the app
export default LandingPage;
