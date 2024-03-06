import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[ SequelizeModule.forFeature([User]),JwtModule.register({
    global:true,
  }), ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
