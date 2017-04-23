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
    ScrollView
} from 'react-native';
import styles from './style';
import emojiData from 'emoji-datasource';
import _ from 'lodash';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabBar from './tab';

const {height, width} = Dimensions.get('window');
require('string.fromcodepoint');

const categories = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];

class Emoticons extends React.Component {
    constructor(props) {
        super(props);
        this._classify = this._classify.bind(this);
        this.state = {
            data: this._classify()
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    _charFromCode(utf16) {
        return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
    }

    _classify() {
        const sortedData = _.orderBy(emojiData, 'sort_order');
        const groupedData = _.groupBy(sortedData, 'category');
        return _.mapValues(groupedData, group => group.map((value)=>this._charFromCode(value.unified)));
    }

    _onChangeTab() {

    }

    render() {
        const emoji = this.state.data['People'];
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarPosition='overlayBottom'
                    renderTabBar={() => <TabBar {...this.props} newNote={this.state.newNote}/>}
                    initialPage={0}
                    onChangeTab={this._onChangeTab.bind(this)}
                    tabBarActiveTextColor="#fc7d30"
                    style={styles.scrollTable}
                    tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                    >

                    <View
                        tabLabel="ios-home-outline"
                        >
                        <View style={styles.cateView}>
                            {emoji.map(vlaue =>
                                    <Text style={styles.emoji}
                                          key={vlaue}>
                                        {vlaue}
                                    </Text>
                            )}
                        </View>

                    </View>
                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                    </ScrollView>
                </ScrollableTabView>

            </View>
        )
    }
}


export default Emoticons;