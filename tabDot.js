import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator,
    InteractionManager,
    Platform
} from 'react-native';
import styles from './style';

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
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    };

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this._setAnimationValue);
    }

    _setAnimationValue({ value, }) {
    }


    _onIconPress(i) {
        this.props.goToPage(i);
    }

    componentWillReceiveProps(){
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