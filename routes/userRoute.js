const { fetchUser, createUser, loginUser, oneUser, updateUser, deleteUser } = require('../controllers/userController');

const userRouter = require('express').Router()

userRouter.get('/users', fetchUser)
userRouter.post('/users/create', createUser)
userRouter.post('/users/login', loginUser)
userRouter.get('/users/:id', oneUser)
userRouter.put('/users/update/:id', updateUser)
userRouter.delete('/user/:id/delete', deleteUser)

module.exports=userRouter;