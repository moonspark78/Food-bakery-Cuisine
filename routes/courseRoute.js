const {fetchCourse, createCourse, oneCourse, updateCourse, deleteCourse} =require("../controllers/couseController")

const courseRouter = require('express').Router()

courseRouter.get('/courses', fetchCourse)
courseRouter.post('/courses/create', createCourse)
courseRouter.get('/courses/:id', oneCourse)
courseRouter.put('/courses/:id/update', updateCourse)
courseRouter.delete('/courses/:id/delete', deleteCourse)

module.exports=courseRouter;