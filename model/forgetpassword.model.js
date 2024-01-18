const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const db = require('../config/db');

const { Schema } = mongoose;

const forgotPasswordSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    code: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v); // Ensure the code is exactly 6 digits
            },
            message: props => `${props.value} is not a valid 6-digit code`
        },
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 3600, // this is the duration in seconds after which the document will expire and be deleted
    }
});

// Create the model from the schema and export it
const ForgotPasswordModel = db.model('forgot_password', forgotPasswordSchema);
module.exports = ForgotPasswordModel;
