/**
 * Created by jay on 5/1/17.
 */

const {generateJadeLocation, generateJadeMessage} = require('./message');
const {io} = require('../server');


class Bot {

    constructor() {

        this.name = 'Chat Bot 3000';

        this.helpChar = '--';

        this.responseList = {
            'help': 'How can I help you?',
            'joke': "Sorry, I don't know any"
        };

        this.speak = (message) => {
            return generateJadeMessage(this.name, message);
        };

    }

    checkResponse (message) {

        let help = this.helpChar;

        if(message.includes(help)) {
            message = message.substr(message.indexOf(help) + help.length);
            message = message.split(' ')[0];
            if(this.responseList.hasOwnProperty(message)){
                return this.speak(this.responseList[message]);
            }
        }

    }


    greetUser(userName) {

        return this.speak(`Welcome to the chat ${userName}! For a list of what I can help you with, type ${this.helpChar}help!`);
    }

}

module.exports = {Bot};
