import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Product } from "./entities/Product"
import { Supplier } from "./entities/Supplier"
import { Client } from "./entities/Client"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Product, Supplier, Client],
})
