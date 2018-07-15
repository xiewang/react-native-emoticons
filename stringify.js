import emojiData from 'emoji-datasource';
import _ from 'lodash';
require('string.fromcodepoint');

const stringify = (text) => {
    let result = '';
    _.each(emojiData, (value, key) => {
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u));
        emojiData[key].textValue = emoji;
    });

    const arr = _.toArray(text);

    _.each(arr, (value, key) => {
        const index = _.findIndex(emojiData, function (o) {
            return o.textValue == value;
        });
        if (index > -1) {
            result += '[' + emojiData[index]['unified'] + ']';
        } else {
            result += value;
        }
    });

    return result;
};

export default stringify;
