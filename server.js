import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import contactRouter from './routes/contact.js'
import { config } from 'dotenv'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//.env setup
config({path: '.env'})

//user router
app.use('/api/user', userRouter)

//contact router 
app.use('/api/contact', contactRouter)

//home router
app.get('/', (req, res) =>{
    res.json({message: "This is the home route working"})
})


mongoose.connect(process.env.MONGO_URI,
    {
        dbName: "NodeJs_Mastery_Course",
    }
)
.then(() => console.log("MongoDb Connected...!"))
.catch((err) => console.log(err));

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Your server is running on the port ${port}`)
})