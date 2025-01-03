const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async(req,res)=>{
    const {userName,email,password} = req.body;
    
    try{
        const check = await User.findOne({email});
        if(check){
            return res.json({success:false,message:"User already exists please try to log in or re enter the email"})
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        });
        await newUser.save();

        res.status(200).json({
            success:true,
            message:'Registration successfull'
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'Some Error occured'
        });
    }

}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    
    try{
        
      const checkUser = await User.findOne({email});
      
      if (!checkUser)
        return res.json({
          success: false,
          message: "User doesn't exists! Please register first",
        });
      
      const checkPassword = await bcrypt.compare(password,checkUser.password); 
      if(!checkPassword) return res.json({
        success:false,
        message:"Incorrect Password"
      });

      const token = jwt.sign({
        id:checkUser._id,
        role:checkUser.role,
        email:checkUser.email,
        userName:checkUser.userName,
      },'CLENT_SECRET_KEY',{expiresIn:'120m'});

      res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message:"Logged in successfully",
        user:{
            email:checkUser.email,
            role:checkUser.role,
            id:checkUser._id,
            userName:checkUser.userName,
        }
      })



    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'Some Error occured'
        });
    }

}

const logoutUser = async(req,res)=>{
    res.clearCookie("token").json({
        success:true,
        message:"Logged out successfully!",
    });
}

const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res
        .status(401)
        .json({
            success:false,
            message:"Unauthorized User!"
        })
    }

    try{

        const decoded = jwt.verify(token,'CLENT_SECRET_KEY');
        req.user = decoded;
        next();

    }catch(error){
        res
        .status(401)
        .json({
            success:false,
            message:"Unauthorized User!"
        })
    }
}


module.exports = { registerUser , loginUser , logoutUser , authMiddleware};