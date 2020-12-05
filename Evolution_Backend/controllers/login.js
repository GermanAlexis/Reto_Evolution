const { generatorJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');


const login = async (req, res) => {
  const { email, password } = req.body; // destructuring of req.body
  
  
  try {
    const userBD = await User.findOne({ email }); // search in  DB for email
      // validation and response in format json the search
      if (!userBD) {
      res.status(404).json({
        ok: false,
        msg: 'Algo no coincide, revisar email',
      });
    }
    // comparison and validation of password
    const validPass = bcrypt.compareSync(password, userBD.password);  
    if (!validPass) {
      res.status(400).json({
        ok: false,
        msg: 'Algo no coincide, revisar password',
      });
    }
    // generation of token 
    const token = await generatorJWT(userBD._id);
    res.status(200).json({
      ok: true,
      msg: 'Login Exitoso',
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador',
    });
  }
};



module.exports = {
  login
};