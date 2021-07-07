const Code = require('../models/CodeModel');

var root = path.join(__dirname, '../../views'); 
module.exports = {
    //This method checks if the code - which the user need to add in landing page - is valid or not
    async checkCode(req, res){
        const {code} = req.body;

        try {
            // we reach the mongoDB with mongoose (handling mongoDB with NodeJS and Express) 
            const compare = await Code.findOne({code});
            
            if(compare){
                if( !compare.used){     
                    compare.used = true; // The used property will be true --> you can not use the sam code twice
                    await compare.save(); 
                    res.status(200).send(compare); 
                }else{
                    res.satus(400).send({message:"Code is used!"});
                }
            }else{
                res.status(400).send({message:"Code did not found in the Database!"});
            }

        } catch (error) {
            throw Error(`Error while compare code: ${error}`);
        }
    },

    //Create new codes
    async createCodes(req, res) {
        const qty = 50;
        let codes = [];

        for (var i = 0; i < qty; i++) {
            //Create a random number string with 18 digit
            let digit = Math.floor(Math.random() * 1000000000000000000).toString();
            codes[i] = digit;
            try {
                //We write the generated codes in the DB (database)
                const code = await Code.create({
                    code: codes[i],
                    used: false
                });
            
            } catch (error) {
                throw Error(`Error while generating codes: ${error}`);
            }
        }
        res.status(200).json("Generated!");
    },

    //We read the generated codes from the DB
    async getCodes(req, res){
        try{
            const codes = await Code.find(); //find is a mongoose function. We can read all of the codes from DB
            //console.log(codes);
            res.status(200).send(codes);
        }catch(error){
            throw Error(`Error while showing codes: ${error}`);

        }
    },
    //Delete all codes from the DB
    async deleteCodes(req, res){
        const delCode = await Code.deleteMany(); //deleteMany is a mongoose function. We can delete with this the codes from DB
        return res.status(200).json({message: "Codes successfully deleted!"});
    }
}
