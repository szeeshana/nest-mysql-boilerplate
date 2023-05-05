import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from '../utils/helpers/generic.helper';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../user/enum/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
    role: UserType,
  ): Promise<any> {
    if (role === UserType.ADMIN || role === UserType.USER) {
      const user: any = await this.userService.findUser(email, role);
      if (user) {
        const matchPassword = comparePassword(pass, user.password);
        if (matchPassword) {
          delete user.password;
          return user;
        }
        throw new UnauthorizedException('Password not match !');
      }
    } else {
      throw new UnauthorizedException('Please enter valid role');
    }
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }
}
