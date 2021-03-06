import React, { PropTypes, Component } from 'react';
import {
    Image,
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import timer from 'react-native-timer';


import { mixins, colors, variables } from '../styles';
import * as fonts from '../fonts';

import * as actions from '../actions';

import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y,
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../constants';

class FloatingArObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offScreenLeft: false,
            offScreenRight: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.startingPosX + nextProps.xOffset) < 0) {
            this.setState({ offScreenLeft: true });
        } else {
            this.setState({ offScreenLeft: false });
        }
        if((nextProps.startingPosX + nextProps.xOffset) > variables.SCREEN_WIDTH) {
            this.setState({ offScreenRight: true });
        } else {
            this.setState({ offScreenRight: false });
        }
        
    }
    shouldComponentUpdate(nextProps) {
        return (
            this.props.xOffset != nextProps.xOffset || 
            this.props.yOffset != nextProps.yOffset ||
            this.props.arObjects.length != nextProps.arObjects.length
        )
    }
    render() {
        return (
            <View style={styles.root}>
                {this.state.offScreenLeft &&
                    <Icon
                        name='ios-arrow-back'
                        size={variables.AR_OBJECT_SIZE*.8}
                        color={colors.yellow}
                        style={[
                            ...mixins.arObject,
                            {
                                top: Math.max(0, this.props.startingPosY + this.props.yOffset),
                                left: 0
                            }
                        ]}
                    />
                }

                <Image
                    source={require('../assets/images/evil_2.png')}
                    resizeMode='contain'
                    style={[
                        styles.arTarget,
                        {
                            top: this.props.startingPosY + this.props.yOffset,
                            left: this.props.startingPosX + this.props.xOffset
                        }
                    ]}
                />

                {this.state.offScreenRight &&
                    <Icon 
                        name='ios-arrow-forward'
                        size={variables.AR_OBJECT_SIZE*.8}
                        color={colors.yellow}
                        style={[
                            ...mixins.arObject,
                            {
                                top: Math.max(0, this.props.startingPosY + this.props.yOffset),
                                left: variables.SCREEN_WIDTH - (variables.AR_OBJECT_SIZE * .8) / 2
                            }
                        ]}
                    />
                }
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.arObject,
        ...mixins.row
    },
    arTarget: {
        ...mixins.arObject,
        height: variables.AR_OBJECT_SIZE,
        width: variables.AR_OBJECT_SIZE
    }
});



function mapStateToProps({ augmented }) {
    return {
        ...augmented
    };
}

export default connect(
    mapStateToProps,
    actions
)(FloatingArObject);