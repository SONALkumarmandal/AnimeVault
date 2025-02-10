

const home=async (req,res)=>{
    try {
        res.status(200).send("welcome to the world")
    } catch (error) {
        // console.log("error : ",error)
    }
}


module.exports={home};