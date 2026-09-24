import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../models/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 12;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, fullName, role } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const newUser = new this.userModel({
      email,
      passwordHash: hashedPassword,
      fullName,
      role,
    });

    const savedUser = await newUser.save();

    return this.buildAuthResponse(savedUser);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async validateUser(userId: string): Promise<AuthResponseDto | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      return null;
    }

    return this.buildAuthResponse(user);
  }

  generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      expiresIn: 86400,
    });
  }

  private buildAuthResponse(user: UserDocument): AuthResponseDto {
    return {
      userId: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }
}
