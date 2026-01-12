import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import {User} from './user.entity'
import {Role} from '../common/roles.enum'


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
    ){}
  async create(email: string, password: string){
    // Step 1: Hash the password after receiving from controller
    const hashed = await bcrypt.hash(password, 10)
    
    // Step 2: Create user object using the user repo
    const user = this.repo.create({
      email,
      password: hashed,
      role: Role.ADMIN
    })
    
   return this.repo.save(user)
    //return user
  }
}
