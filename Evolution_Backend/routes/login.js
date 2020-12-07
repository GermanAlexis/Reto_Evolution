const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validatefields');
const { login } = require('../controllers/login');

const router = Router();

router.post(
  '/', 
   [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateFields
   ],
  login
);


module.exports = router;