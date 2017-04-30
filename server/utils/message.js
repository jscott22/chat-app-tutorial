/**
 * Created by jay on 4/23/17.
 */

// handles sending messages

let moment = require('moment');


let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment.valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};