import usersRoute from "./routes/users.routes.js"
import express from 'express'
import cors from "cors";
import run from './db/connection.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRoute);

app.listen(8080, ()=>{
    run();
    console.log("Server Running!");
})