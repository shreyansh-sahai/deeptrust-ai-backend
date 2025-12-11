import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@application/auth/services/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') provider: string,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new BadRequestException('Missing authorization code');
    }
    const { access_token, refresh_token, id_token, expires_in } =
      await this.authService.exchangeCodeForTokens(code, provider);

    return res.json({
      access_token,
      refresh_token,
      expires_in,
    });
  }
}
