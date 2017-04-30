/**
 * Created by jay on 4/23/17.
 */


let expect = require('expect');
let {generateMessage} = require('./message');
let {generateLocationMessage} = require('./message');



describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = "Mirjam";
        let lat = "32";
        let long = "64";
        let url = `https://www.google.com/maps?q=${lat},${long}`;
        let message = generateLocationMessage(from, lat, long);

        expect(message).toInclude({from, url});
    });

});