/**
 * Created by jay on 4/30/17.
 */

let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};