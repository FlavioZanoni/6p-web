import { DefType } from "../types";

export interface ItemOrders extends DefType {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
}

export interface MutateItemOrders {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}
