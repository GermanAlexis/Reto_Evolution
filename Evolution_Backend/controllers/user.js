const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');

const registerUser = async ( req, res ) => {
    
    try {
        const user = new User(req.body);
        const token = await generatorJWT(user.id);
        const salt = bcrypt.genSaltSync(); // version of encrytion
        user.password = bcrypt.hashSync(user.password, salt); // encrytion password and asignation 
        await user.save(); // save in DB 
        
        // response in format JSON
        res.status(201).json({
            ok: true,
            msg: `Exitosa respuesta`,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error!! Hable con el administrador'
        });
    }
} 

module.exports = {
    registerUser
}