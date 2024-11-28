import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({
        type: 'varchar',
        length: 10,
        enum: ['Entrada', 'Saída']
    })
    type: string;

    @Column()
    productId: number;

    @ManyToOne(() => Order, order => order.transactions)
    order: Order

    @Column()
    orderId: number;

    @CreateDateColumn()
    date: Date;
}