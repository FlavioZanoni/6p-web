import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToOne
  } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
  
  @Entity('order_item')
  export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
  
    @Column()
    orderId: number;
  
    @Column()
    productId: number;
  
    @Column({ type: 'int' })
    quantity: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  }