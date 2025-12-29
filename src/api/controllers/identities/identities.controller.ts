import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import { IdentityService } from '@application/services/identity.service';
import { AddIdentityDto } from './dto/add-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { IdentityResponseDto } from './dto/identity-response.dto';

@ApiTags('identities')
@ApiBearerAuth()
@Controller({ path: 'identities', version: '1' })
export class IdentitiesController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('/add-identity')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a new identity for the current user' })
  @ApiResponse({ status: 201, description: 'Identity created successfully', type: IdentityResponseDto })
  async addIdentity(@CurrentUser() user: JwtPayload, @Body() dto: AddIdentityDto) {
    const identity = {
      goalTitle: dto.goalTitle,
      goalDescription: dto.goalDescription,
      activeIdentity: dto.activeIdentity ?? true,
      demographics: dto.demographics,
      type: dto.type,
    };
    const res = await this.identityService.addIdentity(user.sub, identity);
    return {
      id: res.id,
      identity: res.identity,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
  }

  @Put('/update-identity/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing identity' })
  @ApiResponse({ status: 200, description: 'Identity updated successfully', type: IdentityResponseDto })
  async updateIdentity(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateIdentityDto,
  ) {
    const updates: Record<string, any> = {};
    if (dto.type !== undefined) updates.type = dto.type;
    if (dto.goalTitle !== undefined) updates.goalTitle = dto.goalTitle;
    if (dto.goalDescription !== undefined) updates.goalDescription = dto.goalDescription;
    if (dto.activeIdentity !== undefined) updates.activeIdentity = dto.activeIdentity;
    if (dto.demographics !== undefined) updates.demographics = dto.demographics;

    const res = await this.identityService.updateIdentity(user.sub, id, updates);
    return {
      id: res.id,
      identity: res.identity,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
  }

  @Delete('/delete-identity/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Soft delete an identity' })
  @ApiResponse({ status: 200, description: 'Identity deleted successfully' })
  async deleteIdentity(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    await this.identityService.deleteIdentity(user.sub, id);
    return { success: true, message: 'Identity deleted successfully' };
  }

  @Get('/my-identities')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List identities for the current user' })
  @ApiResponse({ status: 200, description: 'List of identities', type: [IdentityResponseDto] })
  async myIdentities(@CurrentUser() user: JwtPayload) {
    const list = await this.identityService.myIdentities(user.sub);
    return list.map((res) => ({
      id: res.id,
      identity: res.identity,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    }));
  }
}