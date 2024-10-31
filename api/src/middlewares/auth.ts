import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret')
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}