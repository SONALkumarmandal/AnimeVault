const mongoose=require("mongoose")
const bcryt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Secret_Key=process.env.SECRET_KEY
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
});


UserSchema.pre("save",async function(next){
    const user=this;

    if(!user.isModified("password")){
        next();
    }

    try {

       const saltround= await bcryt.genSalt(10)
       const hash_pass= await bcryt.hash(user.password,saltround)
       user.password=hash_pass;

    } catch (error) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function(password){
    return bcryt.compare(password,this.password);
};

UserSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.Secret_Key,
        {
            expiresIn:"30d",
        }
    )
    } catch (error) {
        console.log(error)
    }
}

const User = new mongoose.model("User",UserSchema);
module.exports=User;