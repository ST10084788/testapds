

const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({
                message: 'User must be signed in',
            });
        }

        jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.log('Token verification failed:', err);
                return res.status(401).json({
                    message: 'User must be signed in',
                });
            }

            console.log('Token verified successfully');
            next();
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
