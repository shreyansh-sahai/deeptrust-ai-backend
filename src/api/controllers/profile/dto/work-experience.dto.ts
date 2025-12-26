import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkExperienceItemDto {
  @ApiProperty({ example: 'Senior Software Developer' })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ example: 'DeepTrust AI' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'Artificial Intelligence' })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiProperty({ example: 'Full-time' })
  @IsString()
  @IsOptional()
  employmentType?: string;

  @ApiProperty({ example: 'Remote' })
  @IsString()
  @IsOptional()
  workArrangement?: string;

  @ApiProperty({ 
    example: [
      'Led development of scalable AI-powered services used by enterprise clients',
      'Improved model inference performance by 35%',
      'Mentored junior engineers and led code reviews'
    ] 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keyAchievements?: string[];

  @ApiProperty({ example: '2022-03' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: null, required: false })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  currentlyWorking: boolean;
}

export class SaveWorkExperienceDto {
  @ApiProperty({
    type: [WorkExperienceItemDto],
    example: [
      {
        jobTitle: 'Senior Software Developer',
        companyName: 'DeepTrust AI',
        industry: 'Artificial Intelligence',
        employmentType: 'Full-time',
        workArrangement: 'Remote',
        keyAchievements: [
          'Led development of scalable AI-powered services used by enterprise clients',
          'Improved model inference performance by 35%',
          'Mentored junior engineers and led code reviews'
        ],
        startDate: '2022-03',
        endDate: null,
        currentlyWorking: true
      },
      {
        jobTitle: 'Software Engineering',
        companyName: 'TechNova Solutions',
        industry: 'Software Development',
        employmentType: 'Contract',
        workArrangement: 'Hybrid',
        keyAchievements: [
          'Developed REST APIs serving over 500k monthly users',
          'Reduced system downtime by 25% through improved monitoring',
          'Collaborated with cross-functional teams to deliver features on schedule'
        ],
        startDate: '2019-06',
        endDate: '2022-02',
        currentlyWorking: false
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceItemDto)
  experience: WorkExperienceItemDto[];
}
