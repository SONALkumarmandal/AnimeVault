require("dotenv").config();
const express=require('express')
const cors=require('cors')
const app=express()
const Dbconnect=require("./utils/dbConnection.js")
const authRoute=require("./router/animeValt_Auth.js")
const homeRoute = require("./router/animeValt_homepage.js")
const corsOptions = {
    origin: ["https://anime-vault-gold-seven.vercel.app"], // Directly allow this origin
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/",authRoute);
app.use("/animevalt",homeRoute)

Dbconnect().then(()=>{
    app.listen(3000,()=>{
        console.log(`server started at port : 3000`)
    })
}).catch((err)=>{
    console.log("server error : ",err)
})





