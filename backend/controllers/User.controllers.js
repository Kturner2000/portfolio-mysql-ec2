const userModel = require('../models/User.model');
const generateToken = require('../lib/utils')
const bcrypt = require('bcryptjs'); 

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    
   
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// create a user
const createUser = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        if ( !email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // check if password is long enough
        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
      }

        // check if email already exists
        const user = await userModel.findUserByEmail(email);

        if (user)
            return res
                .status(400)
                .json({ message: "Email already registered" });

                
        
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        
       console.log({email, hashedPassword, first_name, last_name})
        
        const newUser = await userModel.createUser({
          email,
          password: hashedPassword,
          first_name,
          last_name
        });
        console.log(newUser)

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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = await generateToken(user.id, res);

    // Send successful response
    res.status(200).json({
      message: 'Login successful',
      token, // This will now contain the actual token
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
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

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUserById(id);
    
    res.json({message: 'User deleted successfully'});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


module.exports = { getAllUsers, createUser ,getUserById, deleteUserById, login };
