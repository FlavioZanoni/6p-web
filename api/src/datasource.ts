import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Product } from "./entities/Product"
import { Supplier } from "./entities/Supplier"
import { Client } from "./entities/Client"
import { Order } from "./entities/Order"
import { OrderItem } from "./entities/OrderItem"
import { Transaction } from "./entities/Transaction"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Product, Supplier, Client, Order, OrderItem, Transaction],
})
