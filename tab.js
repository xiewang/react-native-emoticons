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

class TabBar extends React.Component {
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
        if(this.props.newNote) {
            this.tabComponent[4].props.onPress();
        }
    }

    render() {
        return (<View style={[styles.tabs, this.props.style, ]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                         key={tab} onPress={() => this._onIconPress(i)}
                                         style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                    <Text style={{fontSize: 25}}>{this.props.tabs[i]}</Text>
                </TouchableOpacity>;
            })}
        </View>);
    }
}

export default TabBar;