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

const {height, width} = Dimensions.get('window');
require('string.fromcodepoint');

const categories = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];
const filters = ['white_frowning_face'];

class Emoticons extends React.Component {
    constructor(props) {
        super(props);
        this._classify = this._classify.bind(this);
        this._onEmoticonPress = this._onEmoticonPress.bind(this);
        this.state = {
            data: this._classify(),
            position: new Animated.Value(this.props.show? 0: -300)
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    componentDidUpdate() {
        Animated.timing(
            this.state.position,
            {
                duration: 300,
                toValue: this.props.show? 0: -300
            }
        ).start();
    }

    _charFromCode(utf16) {
        return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
    }

    _classify() {
        const filteredData = emojiData.filter(e=> !_.includes(filters, e.short_name));
        const sortedData = _.orderBy(filteredData, 'sort_order');
        const groupedData = _.groupBy(sortedData, 'category');

        return _.mapValues(groupedData, group => group.map((value)=>{
                return {
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                }

        }));
    }

    _onChangeTab() {

    }

    _onEmoticonPress(val) {
        if(this.props.onEmoticonPress)
            this.props.onEmoticonPress(val);
    }

    render() {

        const the = this;
        let group = emoji => {
            let groupView = [];
            const blocks = Math.ceil(emoji.length / 28);
            for (let i = 0; i < blocks; i++) {
                let ge = _.slice(emoji, i * 24, (i + 1) * 24);
                groupView.push(
                    <View style={styles.groupView} key={emoji[0]['name']+'block'+i} tabLabel={emoji[0]['name']+'block'+i}>
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
                    </View>
                );
            }
            return groupView;
        };


        let groupsView = [];
        _.each(categories, (value, key)=> {
            const groupView = group(the.state.data[value]);
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

        return (
            <Animated.View style={[this.props.style,styles.container,{bottom: this.state.position}]}>
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

            </Animated.View>
        )
    }
}

Emoticons.propTypes = {
    onEmoticonPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    show: PropTypes.bool
};

export default Emoticons;