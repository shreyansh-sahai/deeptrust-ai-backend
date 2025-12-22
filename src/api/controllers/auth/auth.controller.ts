import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@application/auth/services/auth.service';
import { Config } from '@common/util/config';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('callback')
  @ApiOperation(
    {
      summary: 'Cognito Callback url to redirect to frontend',
      description: 'Cognito Callback url to redirect to frontend while logging in using OAuth2.0',
    })
  @ApiResponse({
    status: 200,
    description: 'Callback url to redirect to frontend',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user details', description: 'Get current user details' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMe(
    @CurrentUser('sub') userId: string,
  ): Promise<User> {
    const user = await this.authService.getMe(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
