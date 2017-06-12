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
    TouchableHighlight,
    AsyncStorage,
    Platform
} from 'react-native';
import styles from './style';
import emojiData from 'emoji-datasource';
import _ from 'lodash';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabBar from './tab';
import TabBarDot from './tabDot';
import stringify from './stringify';
import parse from './parse';
import splitter from './grapheme-splitter';
import WebViewPage from './webView';

const {height, width} = Dimensions.get('window');
require('string.fromcodepoint');

const categories = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];
const filters = ['white_frowning_face'];
const blockIconNum = 23;
let choiceness = ['grinning', 'grin', 'joy', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'heart_eyes', 'kissing_heart',
    'kissing_smiling_eyes', 'stuck_out_tongue_winking_eye', 'sunglasses', 'smirk', 'unamused', 'thinking_face',
    'flushed', 'rage', 'triumph', 'sob', 'mask', 'sleeping', 'zzz', 'hankey', 'ghost', '+1', '-1', 'facepunch', 'v',
    'ok_hank', 'muscle', 'pray', 'point_up', 'lips', 'womans_hat', 'purse', 'crown', 'dog', 'panda_face', 'pig',
    'earth_asia', 'cherry_blossom', 'sunny', 'thunder_cloud_and_rain', 'zap', 'snowflake', 'birthday', 'lollipop',
    'beers', 'popcorn', 'soccer', 'airplane', 'iphone', 'tada', 'heart', 'broken_heart', 'flag_us', 'flag_cn'];

const choicenessAndroid = ['grinning', 'grin', 'joy', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'heart_eyes', 'kissing_heart',
    'kissing_smiling_eyes', 'stuck_out_tongue_winking_eye', 'sunglasses', 'smirk', 'unamused',
    'flushed', 'rage', 'triumph', 'sob', 'mask', 'sleeping', 'zzz', 'hankey', 'ghost', '+1', '-1', 'facepunch', 'v',
    'ok_hank', 'muscle', 'pray', 'point_up', 'lips', 'womans_hat', 'purse', 'crown', 'dog', 'panda_face', 'pig',
    'earth_asia', 'cherry_blossom', 'sunny', 'thunder_cloud_and_rain', 'zap', 'snowflake', 'birthday', 'lollipop',
    'beers', 'soccer', 'airplane', 'iphone', 'tada', 'heart', 'broken_heart', 'flag_us', 'flag_cn'];

const HISTORY_STORAGE = 'history_storage';
class Emoticons extends React.Component {
    constructor(props) {
        super(props);
        this._classify = this._classify.bind(this);
        this._onEmoticonPress = this._onEmoticonPress.bind(this);
        this.state = {
            data: [],
            groupIndex: 1,
            showWV: false,
            position: new Animated.Value(this.props.show ? 0 : -300),
            wvPosition: new Animated.Value(-height),
            history: []
        }
        Platform.OS === 'android' ? choiceness = choicenessAndroid : '';
    }

    static defaultProps = {
        show: false,
        concise: true,
        showHistoryBar: true,
        showPlusBar: true
    };

    componentDidMount() {
        AsyncStorage.getItem(HISTORY_STORAGE,(err,result)=>{
            if(result){
                this.setState({history: JSON.parse(result)});
            }
        });
    }

    componentWillMount() {
        if (this.props.showPlusBar) {
            this.setState({groupIndex: this.state.groupIndex++});
        }

        if (this.props.showHistoryBar) {
            this.setState({groupIndex: this.state.groupIndex++});
        }
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
        Animated.timing(
            this.state.wvPosition,
            {
                duration: 300,
                toValue: this.state.showWV ? 0 : -height
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
                temp.push({
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                });
            });
            _.each(choiceness, (value)=> {
                const one = temp.filter(e=> _.includes([value], e.name));
                if (one[0])
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

    _onChangeTab(data) {
    }

    _onPlusPress() {
        this.setState({showWV: true});
    }

    _onEmoticonPress(val) {
        if (this.props.onEmoticonPress) {
            this.props.onEmoticonPress(val);
            this._history(val);
        }

    }

    _onBackspacePress() {
        if (this.props.onBackspacePress)
            this.props.onBackspacePress();
    }

    _onCloseWV() {
        this.setState({showWV: false});
    }

    _history(val) {
        //AsyncStorage.removeItem(HISTORY_STORAGE);
        AsyncStorage.getItem(HISTORY_STORAGE,(err,result)=>{
            let value = _.clone(val);
            if(result){
                result = JSON.parse(result);
                valIndex = _.find(result,value);
                if(valIndex){
                    valIndex.freq ++;
                    _.remove(result, {name: valIndex.name});
                    result.push(valIndex);
                } else {
                    value.freq = 1;
                    result.push(value);
                }
            }
            result = _.reverse(_.sortBy(result, [function(o) { return o.freq; }]));
            AsyncStorage.setItem(HISTORY_STORAGE, JSON.stringify(result));
            this.setState({history: result});
        });
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
                            style={[styles.emojiTouch,styles.delete]}
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
        const plusButton = <View
            tabLabel={'plus'}
            style={styles.cateView}
            key={'0_plus'}
            />;
        const histroyView = group(the.state.history);
        const history = <View
            tabLabel={'history'}
            style={styles.cateView}
            key={'0_history'}
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
                    histroyView
                }
            </ScrollableTabView>
        </View>;
        if (this.props.showPlusBar) {
            groupsView.push(plusButton);
        }

        if (this.props.showHistoryBar) {
            groupsView.push(history);
        }

        if (this.props.concise) {
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
                                renderTabBar={() => <TabBarDot {...the.props}/>}
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
            (!this.state.showWV) ?
                <Animated.View style={[this.props.style,styles.container,{bottom: this.state.position}]}>
                    <ScrollableTabView
                        tabBarPosition='overlayBottom'
                        renderTabBar={() => <TabBar {...this.props} onPlusPress={this._onPlusPress.bind(this)}/>}
                        initialPage={this.state.groupIndex}
                        onChangeTab={this._onChangeTab.bind(this)}
                        tabBarActiveTextColor="#fc7d30"
                        style={styles.scrollTable}
                        tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                        >
                        {groupsView}
                    </ScrollableTabView>

                </Animated.View> :
                <Animated.View style={[styles.wvContainer,{bottom: this.state.wvPosition}]}>
                    <WebViewPage onBackPress={this._onCloseWV.bind(this)}/>
                </Animated.View>
        );
    }
}

Emoticons.propTypes = {
    onEmoticonPress: PropTypes.func.isRequired,
    onBackspacePress: PropTypes.func,
    style: View.propTypes.style,
    show: PropTypes.bool,
    concise: PropTypes.bool,
    showHistoryBar: PropTypes.bool,
    showPlusBar: PropTypes.bool
};


export default Emoticons;
export {
    stringify as stringify,
    parse as parse,
    splitter as splitter
}