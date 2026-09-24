import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import type { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('USER_NOT_AUTHORIZED');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.authService.validateUser(payload.sub);

      if (!user) {
        throw new UnauthorizedException('USER_NOT_AUTHORIZED');
      }

      (request as Request & { user: AuthResponseDto }).user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('USER_NOT_AUTHORIZED');
    }
  }

  private extractTokenFromCookie(request: Request): string | null {
    const cookies = request.headers.cookie;
    if (!cookies) {
      return null;
    }

    const tokenCookie = cookies
      .split(';')
      .find(cookie => cookie.trim().startsWith('jwt_token='));

    if (!tokenCookie) {
      return null;
    }

    return tokenCookie.split('=')[1] || null;
  }
}
