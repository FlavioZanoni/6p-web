import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../datasource';


export class BaseController<T> {
    protected repository: Repository<T>

    constructor(entity: any) {
        this.repository = AppDataSource.getRepository(entity)
    }

    async index(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const skip = (page - 1) * limit

        const [items, total] = await this.repository.findAndCount({
            skip,
            take: limit
        })

        return res.json({
            data: items,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        })
    }

    async show(req: Request, res: Response) {
        const { id } = req.params
        const item = await this.repository.findOne({ where: { id: parseInt(id) } })

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        return res.json(item)
    }

    async store(req: Request, res: Response) {
        const item = this.repository.create(req.body)
        await this.repository.save(item)
        return res.status(201).json(item)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const item = await this.repository.findOne({ where: { id: parseInt(id) } })

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        this.repository.merge(item, req.body)
        await this.repository.save(item)
        return res.json(item)
    }
}