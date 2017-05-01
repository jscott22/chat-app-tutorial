/**
 * Created by jay on 5/1/17.
 */

class Rooms {

    constructor(){
        this.roomsList = [];
    }

    addRoom(roomName) {

        this.roomsList.push(roomName);
        console.log(`Added room: ${roomName}.`);
        console.log(`Room list is now: ${this.roomsList}.`);

    }

    removeRoom(roomName) {

        this.roomsList = this.roomsList.filter((room) => {
            console.log(room);
            return room !== roomName;
        });

        console.log(`Removed room: ${roomName}.`);
        console.log(`Room list is now: ${this.roomsList}.`);
    }

    hasRoom(roomName) {
        return this.roomsList.indexOf(roomName) > -1;
    }
}

module.exports = {Rooms};