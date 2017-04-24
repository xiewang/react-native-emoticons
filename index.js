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
import TabBarDot from './tabDot';

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
        const groups = Math.ceil(emoji.length / 28);

        let groupView = [];
        for (let i = 0; i < groups; i++) {
            let ge = _.slice(emoji,i*24, (i+1)*24);
            groupView.push(
                <View style={styles.groupView} key={'group'+i} tabLabel={'group'+i}>
                    {
                        ge.map((vlaue,key) => {
                                return (
                                    <Text style={styles.emoji}
                                          key={vlaue}>
                                        {vlaue}
                                    </Text>
                                )

                            }
                        )
                    }
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarPosition='overlayBottom'
                    renderTabBar={() => <TabBar {...this.props}/>}
                    initialPage={0}
                    onChangeTab={this._onChangeTab.bind(this)}
                    tabBarActiveTextColor="#fc7d30"
                    style={styles.scrollTable}
                    tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                    >

                    <View
                        tabLabel="ios-home-outline"
                        style={styles.cateView}
                        >
                        <ScrollableTabView
                            tabBarPosition='bottom'
                            renderTabBar={() => <TabBarDot {...this.props} />}
                            initialPage={0}
                            tabBarActiveTextColor="#fc7d30"
                            style={styles.scrollGroupTable}
                            tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                            >

                            {
                                groupView
                            }
                        </ScrollableTabView>

                    </View>
                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                    </ScrollView>
                </ScrollableTabView>

            </View>
        )
    }
}


export default Emoticons;