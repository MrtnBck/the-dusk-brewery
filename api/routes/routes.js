//Here we have a REST API Endpoints/Resources


//MODULES
const express = require('express');

//FILES
const verifyToken = require('../config/verifyToken');
const UserController = require('../controllers/UserController');
const MainController = require('../controllers/MainController');
const LoginController = require('../controllers/LoginController');
const CodeController = require('../controllers/CodeController');
const EmailController = require('../controllers/EmailController');
const ProductController = require('../controllers/ProductController');

//INSTANCES
const routes = express.Router();

//ROUTES

//Test
/* routes.get('/status', (req, res)=> {
    res.send({status: 200});
    console.log(routes.root);
});*/
//routes.get("/cart/verify",MainController.getShoppingCart);
//routes.get("/products/verify", ProductController.getProducts);
//routes.get("/email/test", EmailController.testEmail);                       //Enpoint for email send testing

//UserController
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);                    //You can reach this endpoint just from POSTMAN/INSOMNIA

//LoginController
routes.post("/login", LoginController.login);                               //You can reach this endpoint if you click login button in login page
routes.get("/login", LoginController.getLogin);

//MainController
routes.get("/", MainController.getLanding);
routes.get("/us", MainController.getAboutUs);
routes.get("/cart/verify", verifyToken ,MainController.getShoppingCart);    //verifyToken is a middleware. You can find in TDB/api/config. See more explanation there
routes.get("/register", MainController.getRegisterPage);
routes.get("/map", MainController.loadMap);
//Product
routes.get("/products/verify", verifyToken, ProductController.getProducts);//verifyToken is a middleware. You can find in TDB/api/config. See more explanation there
routes.get("/product/show", ProductController.showProducts);               //You can reach this endpoint with AJAX if the product_list.html will be render in the browser 
routes.post("/product/create", ProductController.createProduct);           //You can reach this endpoint just from POSTMAN/INSOMNIA    //MUST Requirements -OK
routes.put("/product/update/:productId", ProductController.updateProduct); //You can reach this endpoint just from POSTMAN/INSOMNIA    //MUST Requirements -OK
routes.delete("/product/del/:productId", ProductController.deleteProduct); //You can reach this endpoint just from POSTMAN/INSOMNIA    //MUST Requirements -OK

//Code
routes.post("/register/check", CodeController.checkCode);                  //You can reach this endpoint with AJAX if you click in the register button on the landing.html                          //You can reach this endpoint just from POSTMAN/INSOMNIA
routes.get("/codes/generate", CodeController.createCodes);                 //You can reach this endpoint just from POSTMAN/INSOMNIA
routes.get("/codes/show", CodeController.getCodes);                        //You can reach this endpoint just from POSTMAN/INSOMNIA
routes.get("/codes/delete", CodeController.deleteCodes);                   //You can reach this endpoint just from POSTMAN/INSOMNIA

module.exports = routes;