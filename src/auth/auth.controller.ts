import { Controller, Post, Req, Use } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from '../users/dtos/create-user.dto'
import {UsersService} from '../users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}
  
  @Post('register')
  async register(@Body() dto: CreateUserDto){
    return usersService.create(dto.email, dto.password)
  }
  
  @Post('login')
  @UseGuards(LocalAuthGuard) 
  async login(@Req() req) { 
    return req.user; 
  }

}
