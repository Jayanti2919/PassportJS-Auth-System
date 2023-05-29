import userRoutes from "./routes/users.routes.js"
import express from 'express'


const app = express()

app.get('/api/users', userRoutes);

app.listen(8080, ()=>{console.log("Server started at port 8080")})