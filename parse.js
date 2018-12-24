import emojiData from 'emoji-datasource';
import _ from 'lodash';

const parse = (text) => {
    _.each(emojiData, (value, key) => {
        var reg = new RegExp('\\[' + value.unified + '\\]', "g");
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u));
        if(text)
            text = text.replace(reg, emoji);
    });
    return text;
};

export default parse;