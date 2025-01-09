const userModel = require('../models/User.model');
const generateToken = require('../lib/utils')
const bcyrpt = require('bcryptjs'); 


// create a user
const signup = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        if ( !email || !password || !first_name || last_name) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // check if password is long enough
        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters" });
        }

        // check if email already exists
        const user = await userModel.findUserByEmail(email);
        if (user)
            return res
                .status(400)
                .json({ message: "Email already registered" });

        //  hashing a plain text password plus a salt, the hash algorithm’s output is no longer predictable.
        //A salt is a random string
        const salt = await bcyrpt.genSalt(10);
        //hash password
        const hashedPassword = await bcrypt.hash(password, salt);        
        const newUser = await userModel.createUser(email, hashedPassword, first_name, last_name);
        if (newUser) {
            //generate jwt token
            generateToken(newUser.id, res);
            // adds user to db collection
            return res.status(201).json({
                message: "User created successfully",
                user: { id: newUser.id, email: newUser.email }
              });
            
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    if(users.length === 0) {
        console.log('no users')
    } 
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getAllUsers, getUserById, signup };
