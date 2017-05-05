/**
 * Created by jay on 5/1/17.
 */

const {generateJadeLocation, generateJadeMessage} = require('./message');
const {io} = require('../server');


class Bot {

    constructor() {

        this.name = 'Chatbot 3000';

        this.helpChar = '--';

        this.commandList = {
            'joke': "The real joke was you thinking a chatbot would know any.",
            'purpose': "My purpose is to serve you, and to answer any questions of yours I happen to recognize.",
            'format': "You should format your question like this, 'Chatbot, how are you?' so that I know you want me to listen! (NSA, take notes)"
        };

        this.questionList = {
            'how are you': "I'm just fine, thanks! How are you?",
            'best programming': "JavaScript is the best programming language, of course!",
            'electric sheep': "Isn't that a bit cliche?",
            'vote': "Sorry, I don't like to discuss politics.",
            'god': "I believe exactly what you do!",
            'religion': "I believe exactly what you do!"
        };

        this.confusedList = [
            "Sorry, I didn't understand your question.",
            "Hmm.. want to try that again?",
            "Not sure what you meant, sorry.",
            "Was that a real question?"
        ];

        this.speak = (message) => {
            return generateJadeMessage(this.name, message);
        };

    }

    checkResponse (message) {

        let help = this.helpChar;

        if(message.includes(help)) {
            message = message.substr(message.indexOf(help) + help.length);
            message = message.split(' ')[0];
            if(message === "help") {
                return this.speak("Here's a list of commands you can try: " + Object.keys(this.commandList).join(', ') +
                `. Don't forget to begin your command with '${help}'!`);
            }
            if(this.commandList.hasOwnProperty(message)){
                return this.speak(this.commandList[message]);
            }
            return this.speak("Sorry, I didn't understand that command.")
        }

        if(message.toLowerCase().substr(0, 8) === "chatbot,") {

            let response = this.speak(this.confusedList[Math.floor((Math.random() * this.confusedList.length) + 1)]);

            let questions = Object.keys(this.questionList);

            questions.some((question) => {
                if(message.toLowerCase().indexOf(question) > -1) {
                   response = this.speak(this.questionList[question]);
                }
            });

            return response;

        }

    }


    greetUser(userName) {
        return this.speak(`Welcome to the chat ${userName}! For a list of what I can help you with, type ${this.helpChar}help! Or, go ahead and ask me a question like "Chatbot, how are you?"`);
    }

}

module.exports = {Bot};
