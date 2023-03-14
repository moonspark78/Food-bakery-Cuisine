const { fetchUser, createUser, loginUser,logoutUser, oneUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require("../middlewares/authRoute")
const userRouter = require('express').Router()

userRouter.get('/users', fetchUser)
userRouter.post('/users/create', createUser)
userRouter.post('/users/login', loginUser)
userRouter.get('/users/logout',authenticateToken ,logoutUser)
userRouter.get('/users/:id', oneUser)
userRouter.put('/users/update/:id', updateUser)
userRouter.delete('/user/:id/delete', deleteUser)

module.exports=userRouter;