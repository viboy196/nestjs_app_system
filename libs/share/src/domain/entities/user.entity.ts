import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { constantsInjectable } from '@constants';

@Entity(constantsInjectable.domain.user)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;
}
