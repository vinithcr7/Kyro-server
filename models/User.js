const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    data: [{
        "_id": false,
        "id": String,
        "value": String
    }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;