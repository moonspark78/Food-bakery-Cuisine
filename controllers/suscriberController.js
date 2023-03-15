const Subscriber = require("../models/subscriberModel")



// GET ALL SUSCRIBER
const fetchSuscriber = async (req, res) =>{
    let suscriber = await Subscriber.find({}).populate("Course") 
    return res.status(200).send({
        success: true,
        suscriber,
    });
};


// CREATE DE SUSCRIBER
const createSuscriber = async (req,res) =>{
    try {
        const { name, email, zipCode}= req.body 
        if(!name || !email) {
            return res.status(400).send({
                success: false, 
                message: "Il manque des données"
            });
        }
        let suscriber = new Subscriber({name, email, zipCode}) 
        await suscriber.save();
        const token = jwt.sign({suscriber_id: suscriber.id, email}, process.env.TOKEN_KEY, {expiresIn: "3h"})
        user.token = token;
        return res.status(200).send({
            success: true,
            message: "Le Suscriber a bien était crée",
            // Cette ligne permet d'afficher le model author rempli avec les info mis dans postman
            suscriber
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

// FIND ONE SUSCRIBER
const oneSuscriber = async (req,res) =>{
    try {
        const {id} = req.params
        let suscriber = await Subscriber.findById(id).populate("Course") 
        if(!suscriber){
            return res.status(404).send({
                success: false,
                message: "Le suscriber n'a pas était Trouvé",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Le suscriber a était Trouver",
            suscriber
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
};

// UPDATE A SUSCRIBER
const updateSuscriber = async (req, res) =>{
    const {id} = req.params.id
    /* const {name, email, zipCode, courses} = req.body */
    let suscriber = await Subscriber.findByIdAndUpdate(id, req.body);
    res.status(200).send({
        success: true,
        message: "Suscriber is modified",
        suscriber,
    })
};

// DELETE A SUSCRIBER
const deleteSuscriber = async (req,res)=>{
    try {
        const {id} = req.params
        await Subscriber.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Suscriber is deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}








module.exports = {fetchSuscriber, createSuscriber, oneSuscriber, updateSuscriber, deleteSuscriber}