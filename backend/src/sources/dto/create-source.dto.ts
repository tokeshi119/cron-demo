import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSourceDto {
  @ApiProperty({
    description: 'RSSフィードのURL',
    example: 'https://example.com/feed.xml',
  })
  @IsUrl({}, { message: '有効なURLを入力してください' })
  @IsNotEmpty({ message: 'URLは必須です' })
  url: string;

  @ApiProperty({
    description: 'ソースの名前',
    example: 'Example Tech Blog',
  })
  @IsString({ message: '名前は文字列である必要があります' })
  @IsNotEmpty({ message: '名前は必須です' })
  name: string;

  @ApiProperty({
    description: '有効/無効フラグ',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'enabledは真偽値である必要があります' })
  enabled?: boolean;
}
