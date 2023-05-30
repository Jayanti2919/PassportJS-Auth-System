import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

const router = express.Router();
dotenv.config()

const users = []

router.route('/').get((req, res) => {
    res.json(users)
})

router.route('/').post(async(req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name , password: hashedPass }
        
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const collection = client.db("MernTestbyJ").collection("users");
        collection.insertOne(user);
        await client.close();

        users.push(user)
        res.status(201).send()
    } catch(error) {
        console.log(error)
        res.status(500).json({"msg": "unable to create user"})
    }
})

router.route('/login').post(async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user === null) {
        res.status(400).send("User not found")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            const authUser = { name: req.body.name }
            const accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN)
            res.status(200).json({accessToken: accessToken})
        } else{
            res.status(400).send("Log in rejected")
        }
    } catch(error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
})

export default router;