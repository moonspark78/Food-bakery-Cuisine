const Course = require("../models/courseModel");



// ALL COURSE
const fetchCourse = async (req, res) => {
    let course = await Course.find({})
    return res.status(200).send({
        success: true,
        course,
    });
};


// CREATE COURSE
const createCourse = async (req, res) => {
    try {
        /* const { title, description }= req.body
        if(!(title && description )) {
            return res.status(400).send({
                success: false, 
                message: "Il manque des données"
            });
        } */
        let course =new Course(req.body) 
        await course.save();
        return res.status(200).send({
            success: true,
            message: "Le Course a bien était crée",
            // Cette ligne permet d'afficher le model author rempli avec les info mis dans postman
            course
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

// GET COURSE BY ID

const oneCourse = async (req, res) =>{
    try {
        const {id} = req.params
        let course = await Course.findById(id)
        if(!course){
            return res.status(404).send({
                success: false,
                message: "Le Course n'a pas était Trouvé",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Le Course a était Trouver",
            course
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
};

// UPDATE COURSE
const updateCourse = async (req,res) => {
    const {id} = req.params.id
    /* const { title, description, maxStudents, cost }= req.body */
    let course = await Course.findByIdAndUpdate(id, req.body); 
    res.status(200).send({
        success: true,
        message: "Course is modified",
        course,
    })
};



// DELETE COURSE
const  deleteCourse = async (req, res) => {
    try {
        const {id} = req.params.id
        await Course.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Course is deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};





module.exports = {fetchCourse, createCourse, oneCourse, updateCourse, deleteCourse}
