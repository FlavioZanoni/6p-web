import { Request, Response } from 'express'
import { AppDataSource } from '../datasource'
import { User } from '../entities/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthController {
    async register(req: Request, res: Response) {
        const { email, password, name } = req.body

        const userRepository = AppDataSource.getRepository(User)
        
        const userExists = await userRepository.findOne({ where: { email } })
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        
        const user = userRepository.create({
            email,
            password: hashedPassword,
            name
        })

        await userRepository.save(user)
        
        return res.status(201).json({ user })
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const userRepository = AppDataSource.getRepository(User)
        
        const user = await userRepository.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '1d'
        })

        return res.json({ token })
    }
}