const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {

 
  try {

   
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error("User already exists.");
    }
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = new User({email:userData.email,
                           userName:userData.userName,
                           password:hashedPassword
                                });
    await newUser.save()
    return newUser._id
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    
    const { email, password } = userData;

    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("User is not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    

    return { token, user };

 
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
