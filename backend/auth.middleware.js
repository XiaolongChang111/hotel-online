const jwt = require('jsonwebtoken');
const User = require('./models/user.model'); 


const verifyAdmin = async (req, res, next) => {
  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token === null) {
        return res.sendStatus(401); // If no token, return unauthorized
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(verified._id);
        if (!user || !user.isAdmin) {
            return res.sendStatus(403); 
        }
        req.user = user;
        next(); 
    } catch (error) {
        res.sendStatus(403); 
    }
};

const verifyUser = async (req, res, next) => {
  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token === null) {
        return res.sendStatus(401); // If no token, return unauthorized
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(verified._id);
        if (!user) {
            return res.sendStatus(404); 
        }
        req.user = user;
        next(); 
    } catch (error) {
        res.sendStatus(403); 
    }
};

module.exports = {
    verifyAdmin,
    verifyUser
}
