import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fornecedores")
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  contato: string;

  @Column()
  endereco: string;
}
