const User=require("../models/userModel.js")


const signUp=async (req,res,next)=>{
    try {
        
        const {email,password,userId} = req.body;

        if (!email || !password || !userId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const UserExist=await User.findOne({email})
        if(UserExist){
            return res.status(400).json({message:"email already exist"});
        }

        const userCreated=await User.create({
            email,
            password,
            userId
        });

        res.status(201).json({
            msg:"registration successfull",
            token:await userCreated.generateToken(),
            userId:userCreated._id.toString(),
        });
    } catch (error) {
        // console.log(req.body);
        next(error);
    }
};

const login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist = await User.findOne({email});
        // console.log(userExist)

        if(!userExist){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const validityOfUser = await userExist.comparePassword(password);
        const token=await userExist.generateToken();
        if(validityOfUser){
            res.status(200).json({
                msg:"Login Successfull",
                token:token,
                userId:userExist._id.toString(),
            });
        }
        else if(!localStorage.getItem("token")){
            res.status(401).json({
                message:"Login first"
            })
        }
        else{
            res.status(401).json({
                message:"Invalid email or password"
            })
        }
    } catch (error) {
        res.json({
            status:"falied",
            message:error
        })
    }
}

module.exports ={signUp,login}