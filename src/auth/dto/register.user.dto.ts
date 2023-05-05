import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../../user/enum/user.enum';

export class RegisterUserDto {
  @ApiProperty()
  @Transform((value) => value.value.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @Transform((value) => value.value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Transform((value) => value.value.trim())
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Transform((value) => value.value.trim())
  @IsEnum(UserType)
  role: UserType;
}
