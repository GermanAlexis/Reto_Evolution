const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token'); // Get token of the headers

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No se encontro token',
    });
  }
  try {
    const uid = jwt.verify(token, process.env.KEY_JWT); // verification token with tha Key secret
    req.uid = uid; // asignation of id a request  
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'El token no es valido',
    });
  }
};

module.exports = {
  validateJWT,
};
