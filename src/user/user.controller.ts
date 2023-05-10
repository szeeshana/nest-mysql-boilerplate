import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  Query,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { enCodePassword } from '../utils/helpers/generic.helper';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams } from './dto/pagination.dto';
import { Cache } from 'cache-manager';
import { TestGateway } from '../sockets/test.gateway';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly testGateway: TestGateway,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = enCodePassword(createUserDto.password);
    return this.userService.create(createUserDto);
  }

  @Get()
  async find() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // @Get('pagination')
  // async findPagination(@Query() paginationParams: PaginationParams) {
  //   return this.userService.findPagination({
  //     offset: paginationParams.offset,
  //     limit: paginationParams.limit,
  //   });
  // }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async findAll() {
  //   this.testGateway.emitNotification('event', {
  //     testData: { user: 'zeeshan', email: 'z@z.com' },
  //   });
  //   return this.userService.findAll();
  // }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // async findMe(@Req() req) {
  //   const userData = await this.userService.findMe(req.user.id);
  //   if (!userData) {
  //     throw new NotFoundException();
  //   }
  //   return userData;
  // }
  // @Get('count')
  // @UseGuards(AuthGuard('jwt'))
  // async findCount() {
  //   const userData = await this.userService.findCount();
  //   if (!userData) {
  //     throw new NotFoundException();
  //   }
  //   return userData;
  // }

  // @Get('count-by')
  // @UseGuards(AuthGuard('jwt'))
  // async findCountBy() {
  //   const userData = await this.userService.findCountBy({ role: 'ADMIN' });
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get('find-and-count')
  // @UseGuards(AuthGuard('jwt'))
  // async findAndCount() {
  //   const userData = await this.userService.findAndCount();
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get('find-and-count-by')
  // @UseGuards(AuthGuard('jwt'))
  // async findAndCountBy() {
  //   const userData = await this.userService.findAndCountBy({ role: 'ADMIN' });
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async findOne(@Param('id') id: string) {
  //   const response = await this.userService.findOne(+id);
  //   if (!response) throw new NotFoundException();
  //   return response;
  // }
}
