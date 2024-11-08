const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()
const {userRouter}=require('./Routes/user')
const {adminRouter}=require('./Routes/admin')
const {technicianRouter}=require('./Routes/technician')



app.use(express.json())
app.use(cors())


app.use('/api/users',userRouter)
app.use('/api/technician',technicianRouter)
app.use('/api/admin',adminRouter)



async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Database Successfully');
        app.listen(process.env.PORT, () => {
            console.log("Listening on"+process.env.PORT);
        });
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
}
main()


