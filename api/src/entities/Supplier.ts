import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("supplier")
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  contato: string;

  @Column()
  endereco: string;
}
