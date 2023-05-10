import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { Role } from '../enum/role.enum';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory('Zeeshan')
  @Column()
  firstName: string;

  @Factory('Altaf')
  @Column()
  lastName: string;

  @Factory('test@gmail.com')
  @Column()
  email: string;

  @Factory('test123')
  @Column({ select: false })
  password: string;

  @Factory('USER')
  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
