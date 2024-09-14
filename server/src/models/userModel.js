const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is requied'],
        trim: true,
        minLength: [3, 'The length of user name can be minimum 3 characters'],
        maxLength: [31, 'The length of user name can be maximum 31 characters']
    },
    email: {
        type: String,
        required: [true, 'User email is requied'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'User name is requied'],
        minLength: [6, 'The length of user name can be minimum 3 characters'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
        default: defaultImagePath
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
    },
    phone: {
        type: String,
        required: [true, 'User phone is requried']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBaned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true});

const user = model("Users", userSchema);
module.exports = user;