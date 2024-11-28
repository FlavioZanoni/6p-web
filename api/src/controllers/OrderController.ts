import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Transaction } from "../entities/Transaction";
import { Between, FindOptionsOrder } from "typeorm";

export class OrderController {

    static async createOrder(req: Request, res: Response) {
        const { clientId, userId, status, orderItems } = req.body;

        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const orderItemRepository = AppDataSource.getRepository(OrderItem);
            const transactionRepository = AppDataSource.getRepository(Transaction);

            const order = orderRepository.create({
                clientId,
                userId,
                status: status || 'Pendente',
                total: 0,
            });

            await orderRepository.save(order);

            let total = 0;
            const orderItemsToSave = orderItems.map((item: any) => {
                const { productId, quantity, price } = item;
                total += quantity * price;
                console.log(order)
                return orderItemRepository.create({
                    order: order,
                    orderId: order.id,
                    productId,
                    quantity,
                    price,
                });
            });

            order.total = total;
            await orderItemRepository.save(orderItemsToSave);

            const transactionsToSave = orderItems.map((item: any) => {
                return transactionRepository.create({
                    order,
                    productId: item.productId,
                    amount: item.quantity,
                    type: 'Saída',
                });
            });

            await transactionRepository.save(transactionsToSave);

            return res.status(201).json(order);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao criar pedido', details: err });
        }
    }

    static async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const order = await orderRepository.findOneBy({ id: Number(id) });

            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            order.status = status || order.status;
            await orderRepository.save(order);

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar pedido', details: error });
        }
    }

    static async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const order = await orderRepository.findOneBy({ id: Number(id) });

            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            await orderRepository.remove(order);
            return res.status(200).json({ message: 'Pedido deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar pedido', details: error });
        }
    }

    static async listOrders(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository(Order);

            const { startDate, endDate, status, sortBy, order } = req.query;

            const where: any = {};

            if (startDate && endDate) {
                where.date = Between(new Date(startDate as string), new Date(endDate as string));
            }

            if (status) {
                where.status = status;
            }

            const orderOptions: FindOptionsOrder<Order> = {};
            if (sortBy === 'date' || sortBy === 'total') {
                orderOptions[sortBy] = (order as 'ASC' | 'DESC') || 'ASC';
            } else {
                orderOptions.date = 'ASC';
            }

            const orders = await orderRepository.find({
                where,
                order: orderOptions,
                relations: ['orderItems', 'transactions'],
            });

            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar pedidos', details: error });
        }
    }

    static async listTransactions(req: Request, res: Response) {
        const { type, startDate, endDate } = req.query;

        try {
            const transactionRepository = AppDataSource.getRepository(Transaction);
            const queryBuilder = transactionRepository.createQueryBuilder('transaction');

            if (type) {
                queryBuilder.andWhere('transaction.type = :type', { type });
            }

            if (startDate && endDate) {
                queryBuilder.andWhere('transaction.date BETWEEN :startDate AND :endDate', {
                    startDate,
                    endDate,
                });
            }

            const transactions = await queryBuilder.getMany();
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar transações', details: error });
        }
    }
}