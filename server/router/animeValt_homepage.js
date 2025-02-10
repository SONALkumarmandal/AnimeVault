const express=require("express")
const router=express.Router();
const homepage=require("../controllers/homeController")
router.route("/home").get(homepage.home)

module.exports = router