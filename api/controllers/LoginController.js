//CONFIG
path = require("path");
const bcrypt = require("bcrypt")        //package for password hashing. Password are hashed in the DB (security)
const jwt = require("jsonwebtoken");    //jwt for authentication
var root = path.join(__dirname, '../../views');

//FILES
const User = require("../models/UserModel");

module.exports = {
    root: root,
    getLogin(req, res){
        res.sendFile("login.html", {root});
    },
    //This will handle the login
    async login(req, res){
        try{
            const {username, password} = req.body; 
            
            if( !username || !password){
                return res.status(400).json({message: "Required field is missing!"});
            }

            const user = await  User.findOne({username}); // findOne mongoose function try to find a username in the DB

            if(!user){
                return res.status(400).json({message: "User not found! Do you want to register instead?"});
            }

            const match = await bcrypt.compare(password, user.password);    //1. password: the password from the front end given by the user.
                                                                            //2. user.password: password in the DB, this is Hashed! bcrypt.compare() will decoded the hashed password and compare.

            if(user && match){
                const userResponse = {   //This object will be the authentication data. (key-value pairs)
                    _id: user._id,          
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                }
                return jwt.sign({user:userResponse}, 'secret', (err, token) => {  // This will generate the token. If you are logged in you can find this in localStorage in the browser
                    return res.json({
                        user: token,
                        user_id: userResponse._id       //userResponse._id is the object ID from the MongoDB
                    })
                })
                
            }else{
                return res.status(400).json({message: "Password is incorrect. Forgot your password?"});
            }
        }catch(error){
            throw Error(`Error while Authenticating a User ${error}`);

        }
    }
}