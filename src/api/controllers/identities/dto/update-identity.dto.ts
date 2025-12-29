import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddIdentityDto } from './add-identity.dto';

export class UpdateIdentityDto extends PartialType(AddIdentityDto) {}
