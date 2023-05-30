import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

const users = []

router.route('/').get((req, res) => {
    res.json(users)
})

router.route('/').post(async(req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name , password: hashedPass }
        console.log(salt)
        console.log(hashedPass)
        users.push(user)
        res.status(201).send()
    } catch(error) {
        console.log(error)
        res.status(500).json({"msg": "unable to create user"})
    }
})

export default router;