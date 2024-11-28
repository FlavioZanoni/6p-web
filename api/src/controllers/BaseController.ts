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

        const { filters, sortBy, order } = req.query;

        const where = filters ? JSON.parse(filters as string) : {};

        const orderOptions = sortBy ? { [sortBy as string]: (order as 'ASC' | 'DESC') || 'ASC' } : {};

        const [items, total] = await this.repository.findAndCount({
            where,
            order: orderOptions,
            skip,
            take: limit,
        });

        return res.json({
            content: items,
            meta: {
                total,
                page,
                limit,
                last: items.length < limit,
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
