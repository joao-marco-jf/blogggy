import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export default function AuthGuard (req, res, next) {
    dotenv.config();

    const bearerToken = req.headers['authorization'];
    const token = bearerToken ? bearerToken.split(' ')[1] : null;

    console.log('token', token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', data: [] });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', data: [] });
    }
}