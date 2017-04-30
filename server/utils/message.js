/**
 * Created by jay on 4/23/17.
 */
const path = require('path');
const viewsPath = path.join(__dirname, '../../views');
const moment = require('moment');
const pug = require('pug');
const message = pug.compileFile(viewsPath + "/message.pug");
const locationMessage = pug.compileFile(viewsPath + "/location_message.pug");


let generateJadeLocation = (user, latitude, longitude) => {
    return locationMessage({
        time: moment().format('h:mm a'),
        user,
        locationURL: `https://www.google.com/maps?q=${latitude},${longitude}`,
    });
};

let generateJadeMessage = (user, text) => {

    let time = moment().format('h:mm a');

    return message({
        time,
        user,
        text
    });

};

module.exports = {generateJadeLocation, generateJadeMessage};