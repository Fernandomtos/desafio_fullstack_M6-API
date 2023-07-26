import { hash } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  BeforeRemove,
  DeleteDateColumn,
  AfterSoftRemove,
  BeforeRecover,
  AfterRemove,
  AfterRecover,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 60, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "boolean", default: false })
  admin?: boolean;

  @Column({ type: "varchar", length: 20 })
  fone: string;

  @CreateDateColumn({ type: "date" })
  createdAt?: string | Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | string | null | undefined;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

export { User };
