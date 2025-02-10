const URL=process.env.URI
const mongoose=require("mongoose")
const Dbconnect=async()=>{
    try {
       await mongoose.connect(URL)
       console.log("MongoDB Connected !")
    } catch (error) {
        console.log("DataBase connection error !",error)
        process.exit(0)
    }
}

module.exports=Dbconnect