import React,{PropTypes} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import styles from './style';
import emojiData from 'emoji-datasource';
import _ from 'lodash';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabBar from './tab';
import TabBarDot from './tabDot';
import stringify from './stringify';
import parse from './parse';

const {height, width} = Dimensions.get('window');
require('string.fromcodepoint');

const categories = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];
const filters = ['white_frowning_face'];
const blockIconNum = 23;
const choiceness = ['grinning', 'grin', 'joy', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'heart_eyes', 'kissing_heart',
    'kissing_smiling_eyes', 'stuck_out_tongue_winking_eye', 'sunglasses', 'smirk', 'unamused', 'thinking_face',
    'flushed', 'rage', 'triumph', 'sob', 'mask', 'sleeping', 'zzz', 'hankey', 'ghost', '+1', '-1', 'facepunch', 'v',
    'ok_hank', 'muscle', 'pray', 'point_up', 'lips', 'womans_hat', 'purse', 'crown', 'dog', 'panda_face', 'pig',
    'earth_asia', 'cherry_blossom', 'sunny', 'thunder_cloud_and_rain', 'zap', 'snowflake', 'birthday', 'lollipop',
    'beers', 'popcorn', 'soccer', 'airplane', 'iphone', 'tada', 'heart', 'broken_heart', 'flag_us', 'flag_cn'];

class Emoticons extends React.Component {
    constructor(props) {
        super(props);
        this._classify = this._classify.bind(this);
        this._onEmoticonPress = this._onEmoticonPress.bind(this);
        this.state = {
            data: [],
            position: new Animated.Value(this.props.show ? 0 : -300)
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
        this._classify();
    }

    componentDidUpdate() {
        Animated.timing(
            this.state.position,
            {
                duration: 300,
                toValue: this.props.show ? 0 : -300
            }
        ).start();
    }

    _charFromCode(utf16) {
        return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
    }

    _classify() {
        let filteredData = emojiData.filter(e=> !_.includes(filters, e.short_name));
        let sortedData = _.orderBy(filteredData, 'sort_order');
        let groupedData = _.groupBy(sortedData, 'category');

        if (this.props.concise) {
            filteredData = emojiData.filter(e=> _.includes(choiceness, e.short_name));
            const temp = [];
            _.mapKeys(filteredData, (value)=> {
                temp.push( {
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                });
            });
            _.each(choiceness,(value)=>{
                const one = temp.filter(e=> _.includes([value], e.name));
                if(one[0])
                    this.state.data.push(one[0]);
            });
        } else {
            this.state.data = _.mapValues(groupedData, group => group.map((value)=> {
                return {
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                }
            }));
        }

    }

    _onChangeTab() {

    }

    _onEmoticonPress(val) {
        if (this.props.onEmoticonPress)
            this.props.onEmoticonPress(val);
    }

    _onBackspacePress() {
        if (this.props.onBackspacePress)
            this.props.onBackspacePress();
    }

    render() {

        const the = this;
        let group = emoji => {
            let groupView = [];
            if (!emoji)
                return groupView;
            const blocks = Math.ceil(emoji.length / blockIconNum);
            for (let i = 0; i < blocks; i++) {
                let ge = _.slice(emoji, i * blockIconNum, (i + 1) * blockIconNum);
                groupView.push(
                    <View style={styles.groupView} key={emoji[0]['name']+'block'+i}
                          tabLabel={emoji[0]['name']+'block'+i}>
                        {
                            ge.map((value, key) => {
                                    return (
                                        <TouchableHighlight
                                            underlayColor={'#f1f1f1'}
                                            onPress={()=>this._onEmoticonPress(value)}
                                            style={styles.emojiTouch}
                                            key={value.name}
                                            >
                                            <Text
                                                style={styles.emoji}
                                                >
                                                {value.code}
                                            </Text>
                                        </TouchableHighlight>

                                    )

                                }
                            )
                        }
                        <TouchableOpacity
                            onPress={()=>this._onBackspacePress()}
                            style={styles.emojiTouch}
                            >
                            <Image
                                resizeMode={'contain'}
                                style={styles.backspace}
                                source={require('./backspace.png')}/>
                        </TouchableOpacity>

                    </View>
                );
            }
            return groupView;
        };


        let groupsView = [];
        const plusButton =  <View
            tabLabel={'plus'}
            style={styles.cateView}
            key={'0_plus'}
            >
        </View>;
        const history =  <View
            tabLabel={'history'}
            style={styles.cateView}
            key={'0_history'}
            >
        </View>;
        groupsView.push(plusButton);
        groupsView.push(history);

        if(this.props.concise) {
            const groupView = group(the.state.data);

            groupsView.push(
                <View
                    tabLabel={the.state.data[0]['code']}
                    style={styles.cateView}
                    key={the.state.data[0]['name']}
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
        } else {
            _.each(categories, (value, key)=> {
                const groupView = group(the.state.data[value]);
                if (groupView.length > 0)
                    groupsView.push(
                        <View
                            tabLabel={the.state.data[value][0]['code']}
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
        }


        return (
            <Animated.View style={[this.props.style,styles.container,{bottom: this.state.position}]}>
                <ScrollableTabView
                    tabBarPosition='overlayBottom'
                    renderTabBar={() => <TabBar {...this.props}/>}
                    initialPage={2}
                    onChangeTab={this._onChangeTab.bind(this)}
                    tabBarActiveTextColor="#fc7d30"
                    style={styles.scrollTable}
                    tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                    >
                    {groupsView}
                </ScrollableTabView>

            </Animated.View>
        )
    }
}

Emoticons.propTypes = {
    onEmoticonPress: PropTypes.func.isRequired,
    onBackspacePress: PropTypes.func,
    style: View.propTypes.style,
    show: PropTypes.bool,
    concise: PropTypes.bool
};

export {
    Emoticons as default,
    stringify as stringify,
    parse as parse
}