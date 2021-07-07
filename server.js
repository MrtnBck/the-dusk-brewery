const express = require('express');             
const mongoose = require("mongoose")            
const cors = require("cors");                   
const path = require("path");                   
const app = express();                          
const routes = require("./api/routes/routes.js");

const PORT = process.env.PORT || 8000;          

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()                  
}

app.use(cors());                               
app.use(express.json());                       

mongoose.set('useFindAndModify', false);        //Needed if you want to use mongoose function: FindOneAndUpdate()

//Connect the MongoDB for the app
try{                                                               
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("MongoDB connected!");
}catch (error){
    console.log(error);
}

app.use(express.static('public'));                        //For serving static files from public folder
app.use(express.static('files'))                            // //For serving static files from files folder
app.use("/files", express.static(path.resolve(__dirname, "files")));  //this is needed, because the Open Layers map wasn't able to put the location markers in the map. You can now open an image from the files: http://localhost:8000/files/sample.png
app.use(routes);

app.listen(PORT, ()=> {                     //This will start the server
    console.log(`Listening on ${PORT}`);
})