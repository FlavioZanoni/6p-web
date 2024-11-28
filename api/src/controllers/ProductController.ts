import { BaseController } from './BaseController';
import { Product } from '../entities/Product';
import { Request, Response } from 'express';
import { AppDataSource } from '../datasource';
import { Transaction } from '../entities/Transaction';

export class ProductController extends BaseController<Product> {
    private transactionRepository = AppDataSource.getRepository(Transaction);

    constructor() {
        super(Product);
    }

    async store(req: Request, res: Response) {
        try {
            const { name, preco, quantidade, imagem, descricao, fornecedorId } = req.body;

            const product = this.repository.create({
                name,
                preco,
                quantidade,
                imagem,
                descricao,
                fornecedorId,
            });
            await this.repository.save(product);

            const transaction = this.transactionRepository.create({
                productId: product.id,
                amount: preco,
                type: 'Entrada',
                date: new Date(),
                quantity: quantidade,
            });
            await this.transactionRepository.save(transaction);

            return res.status(201).json({
                product,
                transaction,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar produto.' });
        }
    }
}
