import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userDetails: typeof User) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      //console.log(createUserDto)
      if (createUserDto.password) {
        const salt = await genSaltSync(10);
        const hashedPassword =await hashSync(createUserDto.password, salt);
        console.log( hashedPassword);
      const user =  await this.userDetails.create({...createUserDto,password:hashedPassword});
      return user
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async findAll():Promise<User[]> {
    try{
   const users = await this.userDetails.findAll({where: { is_deleted: false },attributes: { exclude: ['password'] }});
   return users
    }catch(error){
      console.log(error.message)
    }
  }

 async findOne(id: number):Promise<User> {
  try {
    const userById = await this.userDetails.findOne( { where: {id, is_deleted: false }, attributes: { exclude: ['password'] }}); 
   return userById
  } catch (error) {
    console.log(error.message)
  }
  }

 async update(id: number, updateUserDto: UpdateUserDto):Promise<User[]> {
   try {
    const userUpdate = await this.userDetails.update(updateUserDto,  { where: { id ,is_deleted: false}, returning: true } )
    return userUpdate[1]
   } catch (error) {
    console.log(error.message)
   }
  }

async  remove(id: number):Promise<any> {
  try {
    const removeUser = await this.userDetails.findByPk(id);
    removeUser.is_deleted = true;
    removeUser.deleted_at = new Date();
    await removeUser.save();
    return "Deleted"
    
  } catch (error) {
    console.log(error.message)
  }
    
  }

  async findUser(email:string, password:string):Promise<any>{
    try {
      const user = await this.userDetails.findOne( { where: {email }})
if(user.password){
const comparing =  await compareSync (password,user.password)
if(comparing === true){}
return  user
}
 return  false
} catch (error) {
      console.log(error.message)
    }
  }
}
