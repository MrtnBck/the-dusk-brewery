//CONFIG
const Product = require("../models/ProductModel");
const jwt = require("jsonwebtoken");
var root = path.join(__dirname, '../../views');

module.exports = {
    // Creating a new product
    async createProduct(req, res){
        try{
            const {productName, productOrigin, productType, productDescription, productImg, productPrice} = req.body; 

            const product = await Product.create({ 
                productName,
                productOrigin,
                productType,
                productDescription,
                productImg,
                productPrice
            })
            return res.status(200).json(product);
        }catch(error){
            return res.status(400).json({message: `Product not created, error:${error} `});
        }
    },
    //show all products in JSON format
    async showProducts(req, res){
        try{
            const products = await Product.find();
            return res.status(200).json(products);
        }catch(error){
            return  res.status(400).json({error});
        }
    },
    //go to the products page, and authentication with jwt
    getProducts(req, res){
        jwt.verify(req.token, "secret", async(error, authData) => {
            if(error){
                res.sendStatus(401); //Bad authorization
            }else{
                try{
                    //console.log("Token: ", req.token);
                    //res.send(authData);
                    res.sendFile("product_list.html", {root})
                }catch(error){
                    res.send(error);
                }
            }
        });
    },

    async deleteProduct(req, res){
        const {productId} = req.params;
        //console.log(productId);
        try {
            await Product.findByIdAndDelete(productId);  //findByIdAndDelete mongoose function
            return res.status(204).send(); //204 - No Content
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async updateProduct(req, res){
        const {productId} = req.params;
        const {productName, productOrigin, productType, productDescription, productImg, productPrice} = req.body;
        try{
            const updatedProd = await Product.findByIdAndUpdate(productId, { //findByIdAndUpdate mongoose function
                productName, 
                productOrigin,
                productType,
                productDescription,
                productImg,
                productPrice
            })
            return res.status(200).json(updatedProd);
        }catch(error){
            return res.status(400).json({message: `Product not updated, error:${error} `});
        }
    }
}