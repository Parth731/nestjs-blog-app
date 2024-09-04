import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Head,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-user.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { Auth } from 'src/auth/decoarators/auth.decorator';
import { AuthType } from 'src/auth/enum/authType.enum';

//https://localhost:3000/users
@Controller('users')
@ApiTags('Users')
// @UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?') //id is optional
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetch successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: true,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public GetUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    return this.userService.findAll(getUsersParamDto, limit, offset);
  }

  @Post()
  // @SetMetadata('authType', 'None')
  // @Auth(AuthType.None, AuthType.Bearer)
  @Auth(AuthType.None) // not required bearer token //public routes
  @UseInterceptors(ClassSerializerInterceptor)
  public CreateUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public CreateManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }

  @Patch()
  public PatchUsers(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
