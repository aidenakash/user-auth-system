import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './conns';



@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService:JwtService) {}

    async signIn(email:string, pass:string):Promise<any>{
        const user = await this.usersService.findUser(email,pass);
        // console.log(user)
        // return user
        
         const accessTokenPayload = {sub:user.id, username:user.name, userEmail:user.email}
        
        if (user=== false) {
            throw new UnauthorizedException(); 
          }
      const accessToken  = await this.jwtService.signAsync( accessTokenPayload, {expiresIn: '1d',secret: jwtConstants.secret,})
      
  return accessToken
    }
}
