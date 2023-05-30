import usersRoute from "./routes/users.routes.js"
import express from 'express'


const app = express()

app.use(express.json())

app.use('/api/users', usersRoute);

app.listen(8080, ()=>{console.log("Server started at port 8080")})