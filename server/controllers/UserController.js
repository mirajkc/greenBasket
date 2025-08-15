import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Registration: POST /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing data
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });


    return res.status(201).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// User login: POST /api/user/login
export const login = async(req,res) => {
  try {
    const {email,password} = req.body

    // invalid input
    if(!email || !password){
      return res.status(400).json({  // Added status code
        success : false , 
        message : "Email and Password Are Required"
      })
    };

    //checking for the user
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({  // Added status code
        success : false , 
        message : "Invalid Email or Password"
      })
    }

    //comparing pass to the database password
    const isMatch = await bcrypt.compare(password, user.password)

    //if password dont match
    if(!isMatch){
      return res.status(401).json({  // Added status code
        success : false , 
        message : "Invalid Email or Password"
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({  // Changed from 201 to 200
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error.message);  // Changed from "Registration Error"
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

//check Auth /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Fixed
    const user = await User.findById(userId).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//logout user api/user/logout
export const logout = async(req,res) => {
  try {
    res.clearCookie('token', {
      httpOnly : true,
      secure : true,
      sameSite: "none"
    })
    return res.json({
      success : true,  // Fixed: was "sucess"
      message : "Logged Out"
    })
  } catch (error) {
    return res.json({
      success : false,  // Fixed: was "sucess"
      message : error.message,
    })
  }
}