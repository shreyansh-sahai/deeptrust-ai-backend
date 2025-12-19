import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { NetworkService } from '@application/network/services/network.service';
import { SaveNetworkDto } from './dto/save-network.dto';
import { NetworkResponseDto } from './dto/network-response.dto';
import { INetworkType } from '@domain/value-objects/network-type';

@ApiTags('network')
@Controller('api/network')
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
    @Body() dto: SaveNetworkDto,
  ): Promise<NetworkResponseDto> {
    const result = await this.networkService.saveNetwork(
      dto.userId,
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

  @Get('buckets/:userId')
  @ApiOperation({ summary: 'Get bucket list for a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
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
  async getBuckets(@Param('userId') userId: string): Promise<string[]> {
    return await this.networkService.getBucketsByUserId(userId);
  }
}
