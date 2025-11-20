const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


// CRUD
// CREATE (POST) user
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

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash, username });

        return res.status(201).json({ id: user._id, email: user.email });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}

// READ (GET) user
exports.readUserByUsername = async (req, res) => {
    try {
        const name = req.query.name || req.body.name;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const user = await User.findOne({ username: name }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}

// READ (GET) all users
exports.readAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ data: users });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}

// UPDATE (PUT) username and email
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        if (updates.password) {
            return res.status(400).json({ error: 'Password cannot be updated here' });
        }
        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}

// DELETE (DELETE) user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            res.status(404).json({error: 'User not found'})
        }
        res.status(200).json({message: 'User deleted successfully'})
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}
// crud operations slut

// login, logout osv

// LOGIN (POST) user
// ved ikke med token osv endnu
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        return res.json({ message: 'Authenticated' });
    } catch (err) {
        return res.status(500).json({
            message: err.message
            }
        )
    }
}


