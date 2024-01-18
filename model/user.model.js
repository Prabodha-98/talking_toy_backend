const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        lowercase:true,
        required: true,
        unique:true
    },

    password: {
        type: String,
        required: true,
    }
});
userSchema.pre('save',async function(){
    try{
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password,salt);

        user.password = hashpass;
        
    }catch (error){
        throw error;
    }

});

userSchema.statics.changePassword = async function(email, newPassword) {
    try {
        // Find user by email
        // const user = await this.findOne({ email: email });
        console.log("email : ",email)
        const user = await this.findOne({ email: email.email.toLowerCase() });
        if (!user) {
            throw new Error('User not found');
        }

        // Hash the new password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = newPassword.password;
        await user.save();

        return { message: 'Password successfully updated' };
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

// userSchema.methods.comparePassword = async function(userPassword){
//     try{
//         const isMatch = await bcrypt.compare(userPassword,this.password);
//         return isMatch;
//     }catch (error){
//         throw error;
//     }
// }

userSchema.methods.comparePassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password)
        .then(isMatch => isMatch)
        .catch(error => { throw error; });
}

const UserModel = db.model('user', userSchema);

module.exports = UserModel; 