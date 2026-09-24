import { Controller, Post, Get, Body, Res, UseGuards, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto, @Res() res: Response): Promise<void> {
    try {
      const user = await this.authService.register(registerDto);
      const token = this.authService.generateToken(user.userId, user.email);

      this.setAuthCookie(res, token);

      res.json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      if (message.includes('already exists')) {
        throw new BadRequestException({
          error: 'VALIDATION_ERROR',
          message,
        });
      }
      throw new BadRequestException({
        error: 'VALIDATION_ERROR',
        message,
      });
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    try {
      const user = await this.authService.login(loginDto);
      const token = this.authService.generateToken(user.userId, user.email);

      this.setAuthCookie(res, token);

      res.json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      throw new BadRequestException({
        error: 'USER_NOT_AUTHORIZED',
        message,
      });
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response): void {
    res.clearCookie('jwt_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    res.json({ message: 'Successfully logged out' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  me(@CurrentUser() user: AuthResponseDto): AuthResponseDto {
    return user;
  }

  private setAuthCookie(res: Response, token: string): void {
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 86400000,
    });
  }
}
