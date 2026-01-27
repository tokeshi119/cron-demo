import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateSourceDto {
  @ApiProperty({
    description: 'ソースの名前',
    example: 'Updated Tech Blog',
    required: false,
  })
  @IsOptional()
  @IsString({ message: '名前は文字列である必要があります' })
  name?: string;

  @ApiProperty({
    description: '有効/無効フラグ',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'enabledは真偽値である必要があります' })
  enabled?: boolean;
}
