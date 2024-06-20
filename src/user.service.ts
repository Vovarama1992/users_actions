import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';
import { CreateUserDto, EmailUserDto, PasswordUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async findId(email: string): Promise<UserDto> {
    const res = await this.userRepository.findOne({ where: { email } });

    return res;
  }

  async create(userData: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async emailUpdate(id: number, userData: EmailUserDto): Promise<UserDto> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }
  async passwordUpdate(
    id: number,
    userData: PasswordUserDto,
  ): Promise<UserDto> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }
}
