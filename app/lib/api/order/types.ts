import { DefType } from "../types";

export interface Order extends DefType {
    id: number;
    date: string;
    clientId: number;
    status: string;
    total: number;
    userId: number;
    orderItems: Array<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        price: number;
    }>;
    transactions: Array<{
        id: number;
        orderId: number;
        amount: number;
        type: string;
        productId: number;
        date: string;
    }>;
}

export interface MutateOrder {
    clientId: number;
    status?: string;
    total: number;
    userId: number;
    orderItems: Array<{
        productId: number;
        quantity: number;
        price: number;
    }>;
}
