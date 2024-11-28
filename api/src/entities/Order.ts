import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem';
import { Transaction } from './Transaction';
import { Client } from './Client';


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column()
    clientId: number;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'Pendente',
        enum: ['Pendente', 'Concluído']
    })
    status: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @OneToMany(() => Transaction, transaction => transaction.order)
    transactions: Transaction[];

    @Column()
    userId: number;
}