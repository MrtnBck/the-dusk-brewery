//CONFIG
const bcrypt = require("bcrypt");
const path = require("path");
var root = path.join(__dirname, '../../views');

//FILES
const MainController = require("./MainController");
const User = require('../models/UserModel');

module.exports = {
    async createUser(req, res){
        try {
            const {firstName, lastName, password, password2, chkbx, email, username} = req.body;
            
            const existentUser_email = await User.findOne({email});         //check for email in db, if find return true
            const existentUser_username = await User.findOne({username});   //check for username in db, if find return true 

            if(!existentUser_email && !existentUser_username){
                if(password === password2){
                    if(chkbx){
                        const hashedPassword = await bcrypt.hash(password, 10);
        
                        const user = await User.create({
                            firstName,                  //This is the same -> firstName: firstName.  <declared in the mongoose model> : <comes from the front-end in the request body>
                            lastName,
                            email,
                            username,
                            password: hashedPassword  // we save the hashed password to the DB
                        });
                        return res.status(200).json({
                            message: "Registration succesfull!"
                            
                        });
                    }else{
                        return res.status(400).json({
                            message: "Don't have you respect for beer?:("
                        });
                    }
                }else{
                    return res.status(400).json({
                        message: 'Password does not match!'
                    });
                }
            }else{
                return res.status(400).json({
                    message: 'Email/username already exist! Do you want to login instead?'
                });
            }

        }catch (error) {
            throw Error(`Error while registering a new user: ${error}`);
        }
    },

    async getUserById(req, res){
        const {userId} = req.params;
        try {
            const user = await User.findById(userId);
            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: 'User ID not exist, do you want to register instead?',
            });
        }
    }
}