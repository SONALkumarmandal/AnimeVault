
const mongoose=require("mongoose")
const Dbconnect=async()=>{
    try {
       await mongoose.connect(process.env.URI)
       console.log("MongoDB Connected !")
    } catch (error) {
        console.log("DataBase connection error !",error)
        process.exit(0)
    }
}

module.exports=Dbconnect