import { hash } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Contact } from "./contact.entity";

export enum Role {
  userCommon = "userCommon",
  admin = "admin"
}

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

  @Column({ type: "enum", enum: Role})
  admin: string;

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

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}

export { User };
