require("dotenv").config();
require("./config/database").connect();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* const verifyToken = require("./middleware/auth") */

const userRouter = require("./routes/userRoute")
const suscriberRouter = require("./routes/suscriberRoute")
const courseRouter = require("./routes/courseRoute")


const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const {API_PORT} =process.env;
const port = process.env.PORT || API_PORT;

// API ROUTES
app.use("/api", userRouter)
app.use("/api", suscriberRouter)
app.use("/api", courseRouter)

app.listen(port, ()=>console.log('🚀listening on port🚀 ' + port));