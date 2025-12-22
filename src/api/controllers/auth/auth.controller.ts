import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@application/auth/services/auth.service';
import { Config } from '@common/util/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') provider: string,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new BadRequestException('Missing authorization code');
    }
    const data =
      await this.authService.exchangeCodeForTokens(code, provider);

    const encodedData = encodeURIComponent(data);

    return res.redirect(Config.FRONTEND_SUCCESS_URL + '?auth=success&data=' + encodedData);
  }

  @Get('me')
  async getMe(
    @Res() res: Response,
  ) {
    return res.json({
      message: 'Hello World!',
    });
  }
}
