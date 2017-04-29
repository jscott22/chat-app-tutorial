/**
 * Created by jay on 4/23/17.
 */


let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

module.exports = {generateMessage};