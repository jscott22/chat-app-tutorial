/**
 * Created by jay on 5/4/17.
 */
const expect = require('expect');
const {Bot} = require('./bot');

describe('Bot', () => {

    let bot = new Bot();

    it('should get the write answer to help', () => {


        let response = 'How can I help you?';

        let botResponse = bot.checkResponse('--help');

        expect(botResponse).toEqual(response);

    });

});