import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { mixins, colors, variables } from '../styles';
import * as fonts from '../fonts';

import * as actions from '../actions';

class HitScores extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('HitScores componentWillUnmount')
    }
    shouldComponentUpdate(nextProps) {
        return this.props.hitScore !== nextProps.hitScore;
    }
    componentDidUpdate(prevProps) {
        if (this.props.paused) {
            return;
        }
    }
    render() {
        return (
            <View style={styles.root}>
                <Text
                    style={styles.scores}
                >
                    {this.props.hitScore}
                </Text>
                <Text style={styles.text}>Hit Score</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: variables.SCREEN_WIDTH * .45,
        paddingHorizontal: variables.SCREEN_WIDTH * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .05,
        backgroundColor: colors.darkGrayTransparent,
    },
    scores: {
        ...fonts.romanMedium,
        color: colors.white
    },
    text: {
        ...fonts.romanSmall,
        color: colors.white
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
)(HitScores);