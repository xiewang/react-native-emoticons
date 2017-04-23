import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import styles from './style';
import emojiData from 'emoji-datasource';
import _ from 'lodash';

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

    render() {
        const emoji = this.state.data['People'];
        return (
            <View style={styles.container}>
                {emoji.map(vlaue =>
                        <Text style={styles.emoji}
                              key={vlaue}>
                            {vlaue}
                        </Text>
                )}
            </View>
        )
    }
}


export default Emoticons;