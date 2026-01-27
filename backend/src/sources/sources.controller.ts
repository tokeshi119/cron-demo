import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@ApiTags('sources')
@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get()
  @ApiOperation({ summary: 'ソース一覧取得' })
  @ApiResponse({
    status: 200,
    description: 'ソース一覧の取得に成功',
  })
  findAll() {
    return this.sourcesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ソース登録' })
  @ApiResponse({
    status: 201,
    description: 'ソースの登録に成功',
  })
  @ApiResponse({
    status: 409,
    description: 'URLが既に登録されている',
  })
  @ApiResponse({
    status: 400,
    description: 'バリデーションエラー',
  })
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ソース取得' })
  @ApiParam({ name: 'id', description: 'ソースID' })
  @ApiResponse({
    status: 200,
    description: 'ソースの取得に成功',
  })
  @ApiResponse({
    status: 404,
    description: 'ソースが見つからない',
  })
  findOne(@Param('id') id: string) {
    return this.sourcesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ソース更新' })
  @ApiParam({ name: 'id', description: 'ソースID' })
  @ApiResponse({
    status: 200,
    description: 'ソースの更新に成功',
  })
  @ApiResponse({
    status: 404,
    description: 'ソースが見つからない',
  })
  @ApiResponse({
    status: 400,
    description: 'バリデーションエラー',
  })
  update(@Param('id') id: string, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ソース削除' })
  @ApiParam({ name: 'id', description: 'ソースID' })
  @ApiResponse({
    status: 204,
    description: 'ソースの削除に成功',
  })
  @ApiResponse({
    status: 404,
    description: 'ソースが見つからない',
  })
  remove(@Param('id') id: string) {
    return this.sourcesService.remove(id);
  }
}
