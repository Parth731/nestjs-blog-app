import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag-dto';
import { Tag } from '../tags.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * inject tagRepository
     */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTags(createTagDto: CreateTagDto) {
    let tags = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tags);
  }

  public async findMutipleTags(tags: number[]) {
    let results = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  public async deleteTags(id: number) {
    await this.tagRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return {
      deleted: true,
      id,
    };
  }
}
