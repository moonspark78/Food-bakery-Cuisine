const { fetchUser, createUser, loginUser,logoutUser, oneUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require("../middlewares/authRoute")
const verifyToken = require("../middlewares/verifyToken")
const userRouter = require('express').Router()

userRouter.get('/users', fetchUser)
userRouter.post('/users/create', createUser)
userRouter.post('/users/login', loginUser)
userRouter.get('/users/logout',authenticateToken ,logoutUser)
userRouter.get('/users/:id', oneUser)
userRouter.put('/users/update/:id',verifyToken,updateUser)
userRouter.delete('/user/:id/delete',verifyToken, deleteUser)

module.exports=userRouter;