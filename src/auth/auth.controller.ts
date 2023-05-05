import { LoginUserDto } from './dto/login.dto';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Inject,
  CACHE_MANAGER,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { enCodePassword } from '../utils/helpers/generic.helper';
import { Request } from 'express';
import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { ERROR_MESSAGES } from '../utils/constants/generic.constants';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from '../user/enum/user.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginUserDto, @Req() req: Request) {
    return this.authService.login(req.user);
  }

  // Cache is only use for fixed or static data
  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('user_data')
  // @CacheTTL(100)
  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto) {
    if (registerUserDto.role !== UserType.USER) {
      throw new BadRequestException(ERROR_MESSAGES.ADMIN_CANNOT_CREATE);
    }
    const userData = await this.userService.filter({
      email: registerUserDto.email,
      role: registerUserDto.role,
    });

    if (userData.length > 0) {
      throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE);
    }
    registerUserDto.password = enCodePassword(registerUserDto.password);
    return this.userService.create(registerUserDto);
  }
}
