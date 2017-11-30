import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator,
    InteractionManager,
    Platform,
    DeviceEventEmitter
} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';

class TabBarDot extends React.Component {
    constructor(props) {
        super(props);
        this._setAnimationValue = this._setAnimationValue.bind(this);

        this.state = {
            cameraPressed: false
        };
        this.tabComponent = [];
    }


    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
    };

    componentDidMount() {
        const the = this;
        this._listener = this.props.scrollValue.addListener(this._setAnimationValue);

        DeviceEventEmitter.addListener('tabChanged',(tab)=>{
            the.props.goToPage(0);

        });
    }

    _setAnimationValue({ value, }) {
    }


    _onIconPress(i) {
        this.props.goToPage(i);
    }

    componentWillReceiveProps(){
    }

    componentDidUpdate(){
        //this.props.goToPage(this.props.activeTab);
    }

    render() {
        return (<View style={[styles.tabsDot, this.props.style, ]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                         key={tab} onPress={() => this._onIconPress(i)}
                                         style={[styles.tabDot,{backgroundColor: (this.props.activeTab === i? '#ccc': '#fff')}]}>
                    <View style={styles.dot}></View>
                </TouchableOpacity>;
            })}
        </View>);
    }
}

export default TabBarDot;