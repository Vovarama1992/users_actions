import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class EmailUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}

export class PasswordUserDto {
  @ApiProperty({ required: true })
  @IsString()
  password: string;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ActionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  action: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty({ required: false })
  details?: Record<string, any>;

  @ApiProperty({ type: UserDto })
  user_id: UserDto;
}
