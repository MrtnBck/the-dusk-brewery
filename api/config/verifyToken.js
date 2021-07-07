// We use JWT (json web token) for authentication
function verifyToken(req, res, next){
    const bearerToken = req.header('user');     
    if(bearerToken === undefined){              
        res.sendStatus(403); //request forbidden
    }else{
        req.token = bearerToken;
        //console.log(bearerToken);
        next();                                 
    }
}

module.exports = verifyToken                    