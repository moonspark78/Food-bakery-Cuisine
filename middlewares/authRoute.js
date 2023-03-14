const jwt = require('jsonwebtoken');
const config = process.env;



async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  }





/* const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) return res.status(403).send({message: "Invalid token for authentification"})
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded;
        return next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        });
    }
} */




module.exports =authenticateToken; 