import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // Ensure bcrypt is imported
import { AccessTokenType } from 'src/utils/types';
import { Repository } from 'typeorm';
import { jwtConstants } from './constant';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *Regester Usre Creat New User
   * @param registerDto Data for create New User
   * @returns JWT(access Token)
   */

  public async registerUser(
    registerDto: CreateUserDto,
  ): Promise<AccessTokenType> {
    const { username, email, password } = registerDto;

    const foundUser = await this.usersRepository.findOne({ where: { email } });

    if (foundUser) throw new BadRequestException('مستخدم موجود');

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    let newUser: UserEntity = this.usersRepository.create({
      email,
      username,
      password: passwordHashed,
    });

    newUser = await this.usersRepository.save(newUser);
    //Token
    const accessToken = await this.jwtService.signAsync(
      {
        id: newUser.id,
        isAdmin: newUser.isAdmin,
      },
      { secret: 'test', expiresIn: '60s' },
    );
    return { accessToken }; //{ accessToken };
  }

  /**
   * LOGIN USER
   * @param loginDto DATA FOR LOGIN TO USER ACCOUNT
   * @returns JWT(access Token)
   */
  public async login(loginDto: LoginUserDto): Promise<AccessTokenType> {
    const { password, email } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) throw new BadRequestException('كلمة مرور او ايميل غير صحيح');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('كلمة مرور او ايميل غير صحيح');
    // Generate and return JWT token
    const accessToken = await this.generateJWT({
      id: user.id,
      isAdmin: user.isAdmin,
    });
    return { accessToken }; // Return the token
  }

  //***get all user
  public async getAllUsers() {
    return await this.usersRepository.find();
  }

  //***get user by id

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Gets a user by ID.
   * @param BarearToken The Bearer token from the Authorization header.
   * @returns The user with the given ID.
   * @throws {NotFoundException} If the user with the given ID does not exist.
   */
  /******  767ee58a-05f1-4e64-bb7e-37a4479e871a  *******/
  public async getUserById(BarearToken: string) {
    const [type, token] = BarearToken.split(' ');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.JWT_SECRET,
    });
    const user = await this.usersRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) throw new NotFoundException('لا توجد تلاوة بهدا ID');
    console.log(token);
    return user;
  }

  /*************  ✨ Codeium Command 🌟  *************/
  /**
   * Updates a user profile
   * @param id The id of the user to update
   * @param updateUserDto The new values for the user
   * @returns The updated user
   */
  //***update User profile
  public async updateUser(id: number, updateUserDto: CreateUserDto) {
    // Get the user by id
    const user = await this.getUserById(id);

    // Update the user data
    user.username = updateUserDto.username ?? user.username;
    user.email = updateUserDto.email ?? user.email;
    user.isAdmin = updateUserDto.isAdmin ?? user.isAdmin;

    // Save the updated user
    return this.usersRepository.save(user);
  }
  /******  9cc6db0a-4bab-4a3d-916f-7802cc0db9fe  *******/

  //***delete user(id)
  public async deleteUser(id: number) {
    const user = await this.getUserById(id);
    await this.usersRepository.remove(user);

    return { message: 'تم حدف المستخدم بنجاح' };
  }

  /**
   * Generate a JSON Web Token (JWT) with the given payload.
   * @param payload An object with the user's id and isAdmin status.
   * @returns A Promise resolving to a signed JWT.
   * @private
   */
  private generateJWT(payload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
