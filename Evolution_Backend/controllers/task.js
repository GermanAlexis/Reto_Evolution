const Task = require('../models/task.model');

const createTask = async (req, res ) => {
    
    const uid = req.uid.uid;
    const task = new Task({ // new intance to model
    user: uid,              // user assignment through the token
    ...req.body,
  });
    try {
        const taskDB = await task.save();
        res.status(201).json({
          ok: true,
          Task: taskDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error!!, Hable con el administrador`
        })
    }
}

const readTask = async (req, res) => {

    const tasks = await Task.find();
    
      res.status(200).json({
        Ok: true,
        mgs: 'Todos las tareas',
        tasks
      })
}

const updateTask = async (req, res) => {
        const id = req.params.id;  // get id the URL
        const uid = req.uid.uid;  // get uid the token
        try {
          const task = await Task.findById(id); // search task for id
      
          if (!task) {
            return res.status(404).json({
              ok: false,
              msg: `No se encontra tarea con ese id ` + uid,
            });
          }
          const changeData = {
            ...req.body,
            user: req.uid.uid,
          };
          
      
          const updateTask = await Task.findByIdAndUpdate(id, changeData, { new: true }); // make update of data and get current
          res.status(200).json({
            ok: true,
            mgs: 'Se actualizo con exito la tarea',
            tarea: updateTask,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            ok: false,
            msg: 'Comunique al adminsitrador',
          });
        }
      
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
  
    try {
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: `No se encontra tarea con ese id ` + id,
        });
      }
  
      const removeTask = await Task.findByIdAndRemove(id);
      res.status(200).json({
        ok: true,
        mgs: 'Tarea removido',
        tarea: removeTask,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Comunique al adminsitrador',
      });
    }
  };
module.exports = {
    createTask,
    readTask,
    updateTask,
    deleteTask
}