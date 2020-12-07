const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validatefields');

const { registerUser } = require('../controllers/user');
const router = Router();

router.post('/',
  [ 
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('fullname', 'el nombre es obligatorio').not().isEmpty(),
    validateFields,
  ], registerUser);



module.exports = router;
