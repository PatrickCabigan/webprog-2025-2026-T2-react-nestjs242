import { IsString, IsOptional, IsEnum, MinLength, MaxLength, Matches } from 'class-validator';

export enum GenshinRegion {
  MONDSTADT = 'Mondstadt',
  LIYUE = 'Liyue',
  INAZUMA = 'Inazuma',
  SUMERU = 'Sumeru',
  FONTAINE = 'Fontaine',
  NATLAN = 'Natlan',
  SNEZHNAYA = 'Snezhnaya',
}

export class CreateEntryDto {
  @IsString()
  @MinLength(2, { message: 'Username must be at least 2 characters' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, { 
    message: 'Username can only contain letters, numbers, and underscores' 
  })
  username: string;

  @IsString()
  @MinLength(3, { message: 'Message must be at least 3 characters' })
  @MaxLength(500, { message: 'Message cannot exceed 500 characters' })
  message: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  character_name?: string;

  @IsEnum(GenshinRegion)
  @IsOptional()
  region?: GenshinRegion;
}