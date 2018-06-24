import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import {
    Actions
} from 'react-native-router-flux';

import { mixins, colors, variables } from '../styles';
import * as fonts from '../fonts';
import * as actions from '../actions';

import { TIME_TO_NEXT_DAY } from '../constants';

class TimeToComplete extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('TimeToComplete componentWillUnmount')
        timer.clearInterval(this, 'timeToCompleteCounter');

    }
    shouldComponentUpdate(nextProps) {
        return this.props.timeToComplete !== nextProps.timeToComplete
    }
    componentDidUpdate(prevProps) {
        if (this.props.paused) {
            return;
        }
        if(this.props.timeToComplete <= 0) {
            this.props.hitScore < 10 ? this.props.gameOver(false) : this.props.gameOver(true);
            timer.clearInterval(this, 'timeToCompleteCounter');
            Actions.GameOver({ type: 'reset' });
        } else if(!this.props.paused) {
            timer.clearInterval(this, 'timeToCompleteCounter');
            timer.setInterval(this, 'timeToCompleteCounter', () => {
                this.props.subtractTimeToComplete();
            }, TIME_TO_NEXT_DAY)
        }
    }
    render() {
        return (
            <View style={styles.root}>
                <Text
                    style={[
                        styles.days,
                        {color: (this.props.timeToComplete < 10 ?
                            colors.red : colors.white)
                        }
                    ]}
                >
                    {this.props.timeToComplete}
                </Text>
                <Text style={styles.text}>Timer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: variables.SCREEN_WIDTH * .55,
        width: variables.SCREEN_WIDTH * .45,
        paddingHorizontal: variables.SCREEN_WIDTH * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .05,
        backgroundColor: colors.darkGrayTransparent,
    },
    days: {
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
)(TimeToComplete);