import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Supplier } from "./Supplier";

@Entity("produtos")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column("decimal")
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  imagem: string;

  @Column()
  fornecedorId: number;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: "fornecedorId" })
  fornecedor: Supplier;  
}