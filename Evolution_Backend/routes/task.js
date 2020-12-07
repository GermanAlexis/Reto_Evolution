const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validatefields');
const { validateJWT } = require('../middlewares/jwt');
const {
  createTask,
  readTask,
  updateTask,
  deleteTask,
  taskGetById
} = require('../controllers/task');
const router = Router();

// params of routes
router.post('/',
  [
    validateJWT,
    check('nameTask', 'el nombre es obligatorio').not().isEmpty(),
    check('priority', 'la prioridad es obligatoria').not().isEmpty(),
    check('expirationDate', 'Fecha de vencimiento es obligatoria')
      .not()
      .isEmpty(),
    validateFields,
  ],
  createTask
);

router.get('/', validateJWT, readTask);
router.get('/:id', validateJWT, taskGetById);

router.put(
  '/:id',
  [
    validateJWT,
    check('nameTask', 'el nombre es obligatorio').not().isEmpty(),
    check('priority', 'la prioridad es obligatoria').not().isEmpty(),
    check('expirationDate', 'Fecha de vencimiento es obligatoria')
      .not()
      .isEmpty(),
    validateFields,
  ],
  updateTask
);

router.delete('/:id', validateJWT, deleteTask);
module.exports = router;
