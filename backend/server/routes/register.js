//this is for register or create account

const   router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    try{
        console.log(req.body);
        const { error } = validate(req.body);  //request body is validated using a validate function that comes from your ../models/user file:
        if(error)
            return res.status(400).send ({ message: error.details[0].message });
        const user =  await User.findOne({ email:req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exist"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User ({ ...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"})
    }
});

module.exports = router;