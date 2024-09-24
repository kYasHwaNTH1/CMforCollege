const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()


app.use(express.json())
app.use(cors())


async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Database Successfully');
        app.listen(3002, () => {
            console.log("Listening on 3002");
        });
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
}
main()