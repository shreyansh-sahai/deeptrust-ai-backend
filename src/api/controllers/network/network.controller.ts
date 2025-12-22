import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NetworkService } from '@application/network/services/network.service';
import { SaveNetworkDto } from './dto/save-network.dto';
import { NetworkResponseDto } from './dto/network-response.dto';
import { INetworkType } from '@domain/value-objects/network-type';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('network')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'network',
  version: '1',
})
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post('save')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Save a network type to UserContact buckets' })
  @ApiBody({ type: SaveNetworkDto })
  @ApiResponse({
    status: 201,
    description: 'Network saved successfully',
    type: NetworkResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async saveNetwork(
    @CurrentUser('sub') userId: string,
    @Body() dto: SaveNetworkDto,
  ): Promise<NetworkResponseDto> {
    const result = await this.networkService.saveNetwork(
      userId,
      dto.contactId,
      dto.networkType,
      dto.buckets,
    );

    return result;
  }

  @Get('get-network-types')
  @ApiOperation({ summary: 'Get all available network types' })
  @ApiResponse({
    status: 200,
    description: 'List of all network types',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'executive-team' },
          name: { type: 'string', example: 'Executive Team' },
          description: {
            type: 'string',
            example: 'Current Executive Team Members',
          },
        },
      },
    },
  })
  async getNetworkTypes(): Promise<INetworkType[]> {
    return await this.networkService.getNetworkTypes();
  }

  @Get('my-buckets')
  @ApiOperation({ summary: 'Get bucket list for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of buckets for the user',
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['executive-team', 'board-members', 'investors'],
    },
  })
  async getMyBuckets(@CurrentUser('sub') userId: string): Promise<string[]> {
    return await this.networkService.getBucketsByUserId(userId);
  }
}
