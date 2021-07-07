//CONFIG
path = require("path");
var root = path.join(__dirname, '../../views');

module.exports = {
    root:root,
    getLanding(req, res){
        res.sendFile("landing.html", {root});
    },
    getAboutUs(req, res){
        res.sendFile("about_us.html", {root});
    },
    getShoppingCart(req, res){
        res.sendFile("shopping_cart.html", {root});
    },
    getRegisterPage(req, res){
        res.sendFile("register.html", {root})
    },
    loadMap(req, res){
        res.sendFile("map.html", {root});
    }
}