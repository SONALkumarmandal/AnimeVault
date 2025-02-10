const express=require('express')
const router=express.Router();
const authControllers=require('../controllers/AuthController.js')
const {loginSchema,signupSchema} =require("../validators/authValidator.js")
const validate=require("../middlewares/validate_middleware.js")
router.route('/').post(validate(loginSchema),authControllers.login)
router.route('').get((req,res)=>{
    res.send("hi")
})
router.route('/signup').post(validate(signupSchema),authControllers.signUp)

module.exports=router