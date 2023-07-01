const User = require("../models/user");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    hash_password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ "username": req.body.username, "password": hash_password });
    await newUser.save();
    return res.status(200).json(req.body);
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).send('Password is incorrect');
    const token = jwt.sign({ userId: user.id }, 'your_secret_key');
    res.status(200).json({ token });
}
