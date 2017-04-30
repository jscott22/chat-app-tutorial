/**
 * Created by jay on 4/30/17.
 */

class Users {

    constructor(){
        this.usersList = [];
    }

    addUser(id, name, room) {
        let newUser = {id, name, room};
        this.usersList.push(newUser);
        return newUser;
    }

    removeUser(id) {

        let user = this.getUser(id);

        if(user) {
            this.usersList = this.usersList.filter((user) => user.id !== id);
        }

        return user;

    }

    getUser(id) {

        return this.usersList.filter((user) => user.id === id)[0];

    }

    getUserList(room) {

        let roomUsers = this.usersList.filter((user) => user.room === room);

        return roomUsers.map((user) => user.name);

    }

}

module.exports = {Users};