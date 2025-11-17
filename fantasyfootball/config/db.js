const mongoose = require('mongoose');

const connectDB = async (url) => {
    if (!url) throw new Error('MONGO_URL not provided');
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

module.exports = connectDB;