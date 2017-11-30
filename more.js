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
    Platform
} from 'react-native';
var injectedJavaScript = `
    delete window.postMessage
`;

class More extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
    }

    _goBack() {
        this.refs[WEBVIEW_REF].goBack();
        const { navigator } = this.props;

        if (navigator && !this.state.canGoBack) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={[styles.container, {height: height - 21}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="添加商品"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    onLeftIconClicked={this._goBack.bind(this)}
                    />
                <WebView
                    source={{uri: DEFAULT_URL}}
                    style={styles.web}
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    injectedJavaScript={injectedJavaScript}
                    >
                </WebView>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    web: {
        backgroundColor: '#fff',
        height: height,
        width: width,
        top: 0,
        left: 0,
        bottom: 0,
        position: 'absolute',
        flex: 1,
        zIndex: 0
    },
    getItem: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        height: 40,
        width: width,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    getButton: {
        height: 30,
        backgroundColor: '#fc7d30',
        width: width - 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    getText: {
        color: '#fff',
        fontSize: 13
    }
});

export default More;