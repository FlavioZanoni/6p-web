import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { OrderItem } from "../entities/OrderItem";
import { Transaction } from "../entities/Transaction";
import { Between } from "typeorm";

export class ReportController {
    static async getInventoryReport(_req: Request, res: Response) {
        try {
            const orderItemRepository = AppDataSource.getRepository(OrderItem);

            const inventory = await orderItemRepository
                .createQueryBuilder("orderItem")
                .select("orderItem.productId", "productId")
                .addSelect("SUM(orderItem.quantity)", "totalQuantity")
                .groupBy("orderItem.productId")
                .getRawMany();

            return res.status(200).json(inventory);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao gerar relatório de estoque.", details: error });
        }
    }


    static async getSalesReport(req: Request, res: Response) {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "startDate e endDate são obrigatórios." });
        }

        try {
            const orderItemRepository = AppDataSource.getRepository(OrderItem);

            const sales = await orderItemRepository
                .createQueryBuilder("orderItem")
                .leftJoinAndSelect("orderItem.order", "order")
                .select("orderItem.productId", "productId")
                .addSelect("SUM(orderItem.quantity)", "totalSold")
                .addSelect("SUM(orderItem.price * orderItem.quantity)", "totalRevenue")
                .where("order.date BETWEEN :startDate AND :endDate", {
                    startDate,
                    endDate,
                })
                .groupBy("orderItem.productId")
                .getRawMany();

            return res.status(200).json(sales);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao gerar relatório de vendas.", details: error });
        }
    }

    static async getFinancialTransactionReport(req: Request, res: Response) {
        const { type, startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "startDate e endDate são obrigatórios." });
        }

        try {
            const transactionRepository = AppDataSource.getRepository(Transaction);

            const whereConditions: any = {
                date: Between(new Date(startDate as string), new Date(endDate as string)),
            };

            if (type) {
                whereConditions.type = type;
            }

            const transactions = await transactionRepository.find({
                where: whereConditions,
                order: { date: "ASC" },
            });

            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao gerar relatório de transações financeiras.", details: error });
        }
    }
}
