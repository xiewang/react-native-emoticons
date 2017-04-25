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

        const the = this;
        let group = emoji =>{
            let groupView = [];
            const blocks = Math.ceil(emoji.length / 28);
            for (let i = 0; i < blocks; i++) {
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
            return groupView;
        };


        let groupsView = [];
        _.each(categories,(value,key)=>{
            const groupView = group(the.state.data[value]);
            groupsView.push(
                <View
                    tabLabel={the.state.data[value][0]}
                    style={styles.cateView}
                    key={value}
                    >
                    <ScrollableTabView
                        tabBarPosition='bottom'
                        renderTabBar={() => <TabBarDot {...the.props} />}
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
            );
        });

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


                    {groupsView}

                </ScrollableTabView>

            </View>
        )
    }
}


export default Emoticons;