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
import { MyNetworkResponseDto } from './dto/my-network-response.dto';
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
  @ApiOperation({ summary: 'Save contacts to a network (bucket)' })
  @ApiBody({ type: SaveNetworkDto })
  @ApiResponse({
    status: 200,
    description: 'Network updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async saveNetwork(
    @CurrentUser('sub') userId: string,
    @Body() dto: SaveNetworkDto,
  ): Promise<{ message: string }> {
    return await this.networkService.saveNetwork(
      userId,
      dto.contactIds,
      dto.networkType,
      dto.isCustom,
    );
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

  @Get('my-networks')
  @ApiOperation({ summary: 'Get grouped networks for the current user' })
  @ApiResponse({
    status: 200,
    description: 'Grouped list of networks and their associated contact IDs',
    type: [MyNetworkResponseDto],
  })
  async getMyNetworks(
    @CurrentUser('sub') userId: string,
  ): Promise<MyNetworkResponseDto[]> {
    return await this.networkService.getMyNetworks(userId);
  }
}
