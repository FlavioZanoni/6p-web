import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("client")
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf_cnpj: string;

  @Column()
  contato: string;

  @Column()
  endereco: string;
}