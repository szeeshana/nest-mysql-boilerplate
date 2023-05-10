import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { findService } from '../utils/helpers/find.service.helper';
import { Role } from './enum/role.enum';

@Injectable()
export class UserService {
  genericFunctions: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return findService(this.userRepository, 'find', { isDeleted: false });
  }

  findPagination(paginateOptions: {}) {
    return findService(
      this.userRepository,
      'findPaginate',
      {},
      paginateOptions,
      [],
    );
  }

  findOne(id: number) {
    try {
      return findService(this.userRepository, 'findOne', {
        id,
        isDeleted: false,
      }).then((res) => {
        if (res) return res;
        else throw new NotFoundException();
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  filter(options: {}) {
    try {
      return findService(this.userRepository, 'filter', options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findCount() {
    try {
      return findService(this.userRepository, 'count');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findCountBy(options: {}) {
    try {
      return findService(this.userRepository, 'countBy', options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAndCount() {
    try {
      return findService(this.userRepository, 'findAndCount');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findAndCountBy(options: {}) {
    try {
      return findService(this.userRepository, 'findAndCountBy', options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findByIds(options: []) {
    try {
      return findService(
        this.userRepository,
        'findByIds',
        {},
        {},
        options,
      ).then((res) => {
        if (res) return res;
        else throw new NotFoundException();
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  exist(options: {}) {
    try {
      return findService(this.userRepository, 'findByIds', options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findUser(email: string, role: Role) {
    try {
      return this.userRepository
        .findOne({
          where: { email, role, isDeleted: false },
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        })
        .then((res) => {
          if (res) return res;
          else throw new NotFoundException();
        });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findMe(id: number) {
    try {
      return findService(this.userRepository, 'findOne', {
        id: id,
        isDeleted: false,
      }).then((res) => {
        if (res) return res;
        else throw new NotFoundException();
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res)
            return this.userRepository.save({ ...res, ...updateUserDto });
          else throw new NotFoundException();
        });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  remove(id: number) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res) return this.userRepository.save({ ...res, isDeleted: true });
          else throw new NotFoundException();
        });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
