import React from 'react-native';

const {
    StyleSheet,
    Dimensions,
    Platform
    } = React;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseText: {
        fontSize: 13,
        color: '#4a4a4a',
        lineHeight: 18
    },
    dimText: {
        color: '#9b9b9b',
    },
    container: {
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
    },
    emoji: {
        textAlign: 'center'
    }
});

export default styles;