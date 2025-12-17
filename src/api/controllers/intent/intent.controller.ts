import {
  Controller,
  Post,
  Put,
  Delete,
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
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { IntentService } from '@application/intent/services/intent.service';
import { AddIntentDto } from './dto/add-intent.dto';
import { UpdateIntentDto } from './dto/update-intent.dto';
import { IntentResponseDto } from './dto/intent-response.dto';

@ApiTags('intents')
@Controller('api/intents')
export class IntentController {
  constructor(private readonly intentService: IntentService) {}

  @Post('add-intent')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new intent for a user' })
  @ApiBody({ type: AddIntentDto })
  @ApiResponse({
    status: 201,
    description: 'Intent created successfully',
    type: IntentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async addIntent(@Body() dto: AddIntentDto): Promise<IntentResponseDto> {
    const intent = await this.intentService.createIntent(
      dto.userId,
      dto.goalTitle,
      dto.goalDescription,
      dto.metadata,
    );

    return {
      id: intent.id,
      userId: intent.userId,
      goalTitle: intent.goalTitle,
      goalDescription: intent.goalDescription,
      metadata: intent.metadata,
      createdAt: intent.createdAt,
      updatedAt: intent.updatedAt,
    };
  }

  @Put('update-intent')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update an existing intent' })
  @ApiBody({ type: UpdateIntentDto })
  @ApiResponse({
    status: 200,
    description: 'Intent updated successfully',
    type: IntentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Intent not found',
  })
  async updateIntent(@Body() dto: UpdateIntentDto): Promise<IntentResponseDto> {
    const intent = await this.intentService.updateIntent(
      dto.intentId,
      dto.goalTitle,
      dto.goalDescription,
      dto.metadata,
    );

    return {
      id: intent.id,
      userId: intent.userId,
      goalTitle: intent.goalTitle,
      goalDescription: intent.goalDescription,
      metadata: intent.metadata,
      createdAt: intent.createdAt,
      updatedAt: intent.updatedAt,
    };
  }

  @Delete('delete-intent/:id')
  @ApiOperation({ summary: 'Delete an intent by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the intent',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Intent deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Intent deleted successfully' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Intent not found',
  })
  async deleteIntent(@Param('id') id: string) {
    return await this.intentService.deleteIntent(id);
  }

  @Get('intent/:id')
  @ApiOperation({ summary: 'Get a specific intent by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the intent',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Intent retrieved successfully',
    type: IntentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Intent not found',
  })
  async getIntentById(@Param('id') id: string): Promise<IntentResponseDto> {
    const intent = await this.intentService.getIntentById(id);

    return {
      id: intent.id,
      userId: intent.userId,
      goalTitle: intent.goalTitle,
      goalDescription: intent.goalDescription,
      metadata: intent.metadata,
      createdAt: intent.createdAt,
      updatedAt: intent.updatedAt,
    };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all intents for a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'List of intents retrieved successfully',
    type: [IntentResponseDto],
  })
  async getIntentsByUserId(
    @Param('userId') userId: string,
  ): Promise<IntentResponseDto[]> {
    const intents = await this.intentService.getIntentsByUserId(userId);

    return intents.map((intent) => ({
      id: intent.id,
      userId: intent.userId,
      goalTitle: intent.goalTitle,
      goalDescription: intent.goalDescription,
      metadata: intent.metadata,
      createdAt: intent.createdAt,
      updatedAt: intent.updatedAt,
    }));
  }
}
