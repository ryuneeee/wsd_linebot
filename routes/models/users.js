// Import Mongoose and password Encrypt
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// define the schema for User model
const userSchema = mongoose.Schema({
        id: String,
        password: String,
});

// Encrypt Password
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Verify if password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model
module.exports = mongoose.model('User', userSchema);
