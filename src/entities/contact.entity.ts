import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 60 })
  email: string;

  @Column({ type: "varchar", length: 20 })
  fone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | string | null | undefined;

  @ManyToOne(() => User, (user) => user.contacts)
  @JoinColumn()
  user: User;
}

export { Contact };
