const User = require('../models/userModel');

// CREATE user
exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username) {
            return res.status(400).json({
                message: "Username is required."
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required."
            })
        }
        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            })
        }
        const user = await User.create({ username, password, email });

        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            data: userResponse
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}

// READ user
exports.readUser = async (req, res) => {
    try {
        const user = await User.findOne(req.body.name);
    } catch (err) {

    }
}