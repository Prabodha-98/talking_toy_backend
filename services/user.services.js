const UserModel = require('../model/user.model');
const ForgotPasswordModel = require('../model/forgetpassword.model');

const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


class UserService{
     static async registerUser(email,password){
     try{
        const createUser = new UserModel({email,password});
         return await createUser.save();

     }catch(err){
        throw err;
     }
     }

     static async checkuser(email){
      try{
         return await UserModel.findOne({email});
      
      }
     catch (error){
      throw error;
     }
     }

     static async generateToken(tokenData,secretKey,jwt_expire){
      return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
     }

     static async requestPasswordReset(email) {
      // const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Save the code and email in the database
      const forgotPasswordEntry = new ForgotPasswordModel({
          email,
          code // Assuming the ForgotPasswordModel includes a field for the code
      });

      await forgotPasswordEntry.save();
  
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'madaviperera98@gmail.com',
          pass: 'jsrcmduaqpctjzit'
        }
      });
  
      let mailOptions = {
        from: 'madaviperera98@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
               CODE: ${code}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      console.log(code);
      transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
       });

   }

  static async resetPassword(token, newPassword) {
      const forgotPassword = await ForgotPasswordModel.findOne({ code: token });
      if (!forgotPassword) throw new Error('Invalid token');
  
      const hashedPassword = newPassword;
      // await UserModel.updateOne({ email: forgotPassword.email }, { password: hashedPassword });
      await UserModel.changePassword({email:forgotPassword.email}, {password: newPassword}).then(result => {
        console.log(result);
    }).catch(error => {
        console.error(error);
    });
  
      await ForgotPasswordModel.deleteOne({ token });
    }

  static async checkCodeExists(code) {
      try {
          const result = await ForgotPasswordModel.findOne({ code });
          if (result) {
              console.log("Code exists in the database.");
              return true; // The code exists
          } else {
              console.log("Code does not exist in the database.");
              return false; // The code does not exist
          }
      } catch (error) {
          console.error("Error checking if code exists:", error);
          throw error;
      }
  }

    static async generateRandomNumber() {
      // Generate a random number between 100000 and 999999 (inclusive)
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    
      // Convert the number to a string and pad it with leading zeros if necessary
      return randomNumber.toString().padStart(6, '0');
    }
    
    // Example usage

    
}


module.exports = UserService;