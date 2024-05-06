import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "src/typeorm/entities/User";
import { UserDetails } from "src/utils/types";
import { Repository } from "typeorm";
// import { generateFromEmail } from "unique-username-generator";
// import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async validateGoogleUser(details: UserDetails) {
    try {
      const existUser = await this.findUser({ email: details.email });
      if (existUser) {
        return existUser;
      }

      return this.registerUser(details);
    } catch (error) {
      console.log("🚀 ~ AuthService ~ validateUser ~ error:", error);
    }
  }

  async validateUser(details: UserDetails) {
    console.log("🚀 ~ AuthService ~ validateUser ~ details:", details);
    try {
      const existUser = await this.userRepository.findOne({
        where: { email: details.email },
      });

      if (existUser) {
        const isValidPassword = await this.checkPassword(
          details.password,
          existUser.password
        );
        if (!isValidPassword) {
          throw new UnauthorizedException();
        } else {
          return this.signJWT(existUser);
        }
      } else {
        const newUser = await this.registerUser(details);
        return this.signJWT(newUser);
      }
    } catch (error) {
      console.log("🚀 ~ AuthService ~ validateUser ~ error:", error);
    }
  }
  async registerUser(details: UserDetails) {
    try {
      const newUser = this.userRepository.create(details);
      const savedUser = await this.userRepository.save(newUser);
      delete savedUser.password;

      return savedUser;
    } catch (error) {
      console.log("🚀 ~ AuthService ~ registerUser ~ error:", error);
    }
  }

  async findUser({ email, id }: { email: string; id?: number }) {
    const user = await this.userRepository.findOne({
      where: [{ email }, { id }],
    });
    if (user) {
      delete user.password;
    }
    return user;
  }
  async signJWT(user: any) {
    return this.jwtService.signAsync({
      email: user.email,
      name: user.displayName,
    });
  }
  async decryptJWT(access_token: string) {
    return this.jwtService.decode(access_token);
  }
  async hashPassword(password: string) {
    const salt = "salt";
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  async checkPassword(password: string, hash: string) {
    const pass = await bcrypt.compare(password, hash).then(async (res) => {
      return res;
    });
    return pass;
  }
}
