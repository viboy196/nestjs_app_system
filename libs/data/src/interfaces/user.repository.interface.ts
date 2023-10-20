import { BaseInterfaceRepository } from '@core/repositories/sql/sql.base.interface.repository';
import { UserEntity } from '@share/domain/entities/user.entity';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
