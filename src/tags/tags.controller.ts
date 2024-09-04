import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag-dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * inject tagService
     */
    private readonly tagService: TagsService,
  ) {}

  @Post()
  public async createTags(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.createTags(createTagDto);
  }

  @Delete()
  public async deleteTags(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.deleteTags(id);
  }

  //tags/soft-delete
  @Delete('soft-delete')
  public async softDeleteTags(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.softRemove(id);
  }
}
