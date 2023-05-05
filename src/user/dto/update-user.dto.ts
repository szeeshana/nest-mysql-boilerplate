import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;
}
