import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { UserType } from '../enum/user.enum';
import { Factory } from 'nestjs-seeder';

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
    enum: UserType,
  })
  role: UserType;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
