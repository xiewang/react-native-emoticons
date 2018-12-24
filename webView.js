'use strict';

import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    WebView,
    Platform,
    Button,
} from 'react-native';
const {height, width} = Dimensions.get('window');
var backImg = require('./rg_left.png');

class Webview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'GreatGreatGreatGreat',
    });

    componentDidMount() {

    }

    componentWillMount() {
    }

    _onBackPress() {
        this.props.onBackPress();
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? {marginTop: 21} : {marginTop: 21}]} visible='hidden'>
                <View style={styles.toolbar}>
                    <TouchableOpacity
                        style={styles.leftIOSContainer}
                        onPress={this._onBackPress.bind(this)}
                        >
                        <Image
                            style={styles.leftIOS}
                            source={backImg}
                            />
                    </TouchableOpacity>

                    <View style={styles.titleViewIOS}>
                        <TouchableOpacity style={styles.titleViewIOSClick}>
                            <Text
                                style={styles.titleIOS}
                                >
                                表情商城
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={styles.content}>
                    <Text style={styles.tip}>
                        Custom emoticons is on going
                    </Text>
                    <Text style={styles.tip1}>
                        If you like this component, a star will be nice, thanks!
                    </Text>
                </View>

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        top: 0,
        //left: 0,
        height: height,
        width: width,
        backgroundColor: '#f0f0f0',
        flex: 1,
        zIndex: 10000
    },
    toolbar: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //height: 58,
        //shadowOffset: {width: 0, height: .2,},
        //shadowOpacity: .3,
        borderBottomWidth: 1,
        borderColor: '#eee',
        shadowColor: '#555',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 10
    },
    titleIOS: {
        textAlign: 'center',
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftIOSContainer: {
        width: 40,
        height: 35,
        justifyContent: 'center',
    },
    leftIOS: {
        //height: 18,
        //width: 24,
        marginLeft: 10
    },
    titleViewIOS: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 40
    },
    titleViewIOSClick: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40
    },
    content: {
        alignItems: 'center',
        height: height,
        width: width
    },
    tip: {
        fontSize: 20,
        marginTop:30,
    },
    tip1: {
        fontSize: 12,
        position: 'absolute',
        textAlign: 'center',
        width: width,
        color: 'red',
        bottom: 100,
    }
});


export default Webview;