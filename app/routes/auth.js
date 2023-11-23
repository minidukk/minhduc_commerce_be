const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

dotenv.config();

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
          res.status(404).json("Incorrect username");
        }
        const inputPassword = req.body.password;
        if (!inputPassword){
           res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        
       const { password, ...others } = user._doc;  
       
       res.status(200).json({...others, accessToken});

    } catch (err) {
      res.status(500).json(err);
    }

});

module.exports = router;