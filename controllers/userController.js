const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// READ user
const fetchUser = async (req, res) =>{
    let user = await User.find({})
    return res.status(200).send({
        success: true,
        user,
    });
};

// CREATE AUTHOR
const createUser = async (req,res) =>{
    try {
        const {name,lastName, email, zipCode, password, coursesId} = req.body;
        if(!name || !lastName || !email || !zipCode || !password || !coursesId) {
            return res.status(400).send({
                success: false, 
                message: "Il manque des données"
            });
        } 
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(200).send({
                success: false, 
                message: "User already exists, please login"
            })
        }
        // Hashé le mdp
        const hashedPassword =  await bcrypt.hash(password, 10);
        // Creer le user donc le SAVE
        const user = await User.create({name, lastName, email: email.toLowerCase(),courses:coursesId, password : hashedPassword});
        
        // Mettre le JWT
        const token = jwt.sign({user_id: user.id, email}, process.env.TOKEN_KEY, {expiresIn: "3h"})
        user.token = token;
        return res.status(200).send({
            success: true,
            message: "Un User a bien étais enregistrer",
            user,
            
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// LOGIN user
const loginUser = async (req, res) =>{
    try {
      // On recupere l'email et le password du req
      const { email, password} = req.body
      if(!(email && password)){
          return res.status(400).send({
              success: false, 
              message: "All input are required"
          });
      }
      // on trouve le user en fct de email
      const user = await User.findOne({email})
      //si ya pas user:
      if(user && (await bcrypt.compare(password, user.password))){
          const token = jwt.sign({user_id: user.id, email}, process.env.TOKEN_KEY, {expiresIn: "2h"})
          user.token = token;
          return res.status(200).send({
              success: true,
              message: "Le user a  été Trouvé",
              user
          })
      }  
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

// LOGOUT user
const logoutUser = async (req, res) =>{

};

// Get user by ID
const oneUser = async (req,res) => {
    try {
        const {id} = req.params
        let user = await User.findById(id)
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Le User n'a pas était Trouvé",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Le User a était Trouver",
            user
        }) 
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        }) 
    }
};


// UPDATE A USERrs
const updateUser = async (req, res) => {
    const id = req.params.id
/*     const {name,lastName, email, zipCode, password, courses} = req.body; */
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).send({
        success: true,
        message: "User is modified",
        user,
    })
};


// DELETE A USER
const deleteUser = async (req, res) =>{
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "User is deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
    
};







module.exports = {fetchUser, createUser, loginUser, logoutUser, oneUser, updateUser, deleteUser}