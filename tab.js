import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator,
    InteractionManager,
    Platform,
    ScrollView,
    Image
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
        setTimeout(()=>{
            this.props.goToPage(this.props.activeTab);
        },100)
    }

    _setAnimationValue({ value, }) {
    }


    _onIconPress(i) {
        this.props.goToPage(i);
    }

    _getMore() {
        this.props.onPlusPress();
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <View style={[styles.tabs, this.props.style, ]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    >
                    {this.props.tabs.map((tab, i) => {
                        if(tab === 'plus'){
                            return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                                     key={tab} onPress={() => this._getMore()}
                                                     style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                                <Image
                                    resizeMode={'contain'}
                                    style={styles.plusButton}
                                    source={require('./plus.png')}/>
                            </TouchableOpacity>;
                        }

                        if(tab === 'history'){
                            return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                                     key={tab} onPress={() => this._onIconPress(i)}
                                                     style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                                <Image
                                    resizeMode={'contain'}
                                    style={styles.plusButton}
                                    source={require('./history.png')}/>
                            </TouchableOpacity>;
                        }

                        return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                                 key={tab} onPress={() => this._onIconPress(i)}
                                                 style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                            <Text style={{fontSize: 25}}>{this.props.tabs[i]}</Text>
                        </TouchableOpacity>;
                    })}
                </ScrollView>

            </View>);
    }
}

export default TabBar;