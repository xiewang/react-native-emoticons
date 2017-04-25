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
        backgroundColor: '#fff',
        height: 300,
        width: width,
        position: 'absolute',
        bottom: 0,
        left:0
    },
    emoji: {
        textAlign: 'center',
        fontSize: 25,
        lineHeight: 50,
        width: 50,
        height: 50
    },
    scrollTable: {
        width: width
    },
    scrollGroupTable: {
        paddingBottom: 50
    },
    cateView: {
        flex: 1,
    },
    groupView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width: 60,
        borderRightWidth: 1,
        borderColor: 'rgba(178,178,178,.3)',
        backgroundColor: '#fff'
    },
    tabs: {
        height: 40,
        width: width,
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopColor: 'rgba(178,178,178,0.3)',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    tabsDot: {
        height: 40,
        width: width,
        flexDirection: 'row',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    dot: {
        backgroundColor: '#f1f1f1',
        width: 6,
        height: 6,
        borderRadius: 3,
    }
});

export default styles;