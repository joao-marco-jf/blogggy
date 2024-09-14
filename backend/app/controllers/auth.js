import { db } from "../database/index.js"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export function signIn(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    console.log('email', email);
    console.log('password', password);

    dotenv.config();

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is required', data: [] });
    }

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', data: [] });
    }

    db.from('users')
        .select('*')
        .eq('email', email)
        .then(({ data, error }) => {
            if (error) {
                return res.status(500).json({ message: 'Error: ' + error.message, data: [] });
            }

            if (!data.length) {
                return res.status(404).json({ message: 'User not found', data: [] });
            }

            const user = data[0];

            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials', data: [] });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ message: 'Success', data: { token } });
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Error: ' + error.message, data: [] });
        });
}

export function verifyToken(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken ? bearerToken.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Token is required', data: [] });
    }

    dotenv.config();

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is required', data: [] });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token', data: [] });
        }

        return res.status(200).json({ message: 'Success', data: decoded });
    });
}