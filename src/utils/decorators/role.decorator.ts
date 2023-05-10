import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/enum/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
