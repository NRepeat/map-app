import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";
@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(data: User) {
    try {
      const existUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (!existUser) {
        const newUser = this.userRepository.create({
          email: data.email,
          displayName: data.displayName ? data.displayName : data.email,
          password: data.password ? data.password : "",
        });
        return this.userRepository.save(newUser);
      } else {
        return existUser;
      }
    } catch (error) {
      console.log("🚀 ~ UserService ~ createUser ~ error:", error);
    }
  }
  async findUser(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      return user || null;
    } catch (error) {}
  }
}
