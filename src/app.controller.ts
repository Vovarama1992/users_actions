import { Controller, Get, Post, Put, Query, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import ActionService from './action.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  EmailUserDto,
  PasswordUserDto,
  UserDto,
  ActionDto,
} from './dto';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly actionService: ActionService,
  ) {}
  @ApiTags('users')
  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.userService.findAll();
  }
  @ApiTags('actions')
  @Get('actions/:email')
  @ApiOperation({ summary: 'Get actions by user email' })
  @ApiParam({ name: 'email', type: 'string', description: 'User email' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: 'number',
    description: 'Page size',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved actions.' })
  async getActions(
    @Param('email') email: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<{
    data: ActionDto[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const user = await this.userService.findId(email);
    const id = user?.id;
    if (!id) {
      throw new Error('User not found');
    }
    return this.actionService.getActionsByUserId(id, page, pageSize);
  }
  @ApiTags('users')
  @Post('users')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserDto,
  })
  async create(@Body() userData: CreateUserDto): Promise<UserDto> {
    await this.userService.create(userData);

    const user = await this.userService.findId(userData.email);

    await this.actionService.createAction(user.id, 'create', userData);

    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }
  @ApiTags('users')
  @Put('users/email/:id')
  @ApiOperation({ summary: 'Update user email by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: EmailUserDto })
  @ApiResponse({
    status: 200,
    description: 'User email updated successfully.',
    type: UserDto,
  })
  async updateEmail(
    @Param('id') id: number,
    @Body() emailUserDto: EmailUserDto,
  ): Promise<UserDto | null> {
    const user = await this.userService.emailUpdate(id, emailUserDto);
    if (user) {
      await this.actionService.createAction(id, 'email_update', emailUserDto);
      return {
        id: user.id,
        email: user.email,
        password: user.password,
      };
    }
    return null;
  }
  @ApiTags('users')
  @Put('users/password/:id')
  @ApiOperation({ summary: 'Update user password by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: PasswordUserDto })
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully.',
    type: UserDto,
  })
  async updatePassword(
    @Param('id') id: number,
    @Body() passwordUserDto: PasswordUserDto,
  ): Promise<UserDto | null> {
    const user = await this.userService.passwordUpdate(id, passwordUserDto);
    if (user) {
      await this.actionService.createAction(
        id,
        'password_update',
        passwordUserDto,
      );
      return {
        id: user.id,
        email: user.email,
        password: user.password,
      };
    }
    return null;
  }
}
