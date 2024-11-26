const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");


// User Registration
module.exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNo } = req.body;

        if (!req.body.email.includes("@")) {
            return res.status(400).send({ error: 'Email invalid' });
        }

        if (req.body.mobileNo.length !== 11) {
            return res.status(400).send({ error: 'Mobile number invalid' });
        }

        if (req.body.password.length < 8) {
            return res.status(400).send({ error: 'Password must be at least 8 characters' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNo
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).send({
            message: 'Registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};


// User Login
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        // Send response with token
        res.status(200).send({ access: auth.createAccessToken(user) });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};


// Get User's details
module.exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, { password: 0 });

        if (user) {
            return res.status(200).send({
                user: {
                    id: user._id,
                    email: user.email,
                    __v: user.__v
                }
            });
        } else {
            return res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send({details: error});
    }
};