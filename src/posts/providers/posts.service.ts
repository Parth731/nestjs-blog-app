import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostDto } from '../dtos/get-post.dto';
import { PagainationProvider } from 'src/common/pagination/provider/pagaination.provider';
import { paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-interface';

@Injectable()
export class PostsService {
  constructor(
    // injecting users service
    private readonly userService: UsersService,
    /**
     * inject postRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * inject metaOptionsRepository
     */
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
    /**
     * inject tagServices
     */
    private readonly tagsService: TagsService,

    /**
     * injecting paginationProvider
     */
    private readonly pagainationProvider: PagainationProvider,

    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * creating new posts
   */

  public async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.createPost(createPostDto, user);
  }

  public async findPostsByUserId(
    postQuery: GetPostDto,
    userId: number,
  ): Promise<paginated<Post>> {
    let posts = await this.pagainationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );
    return posts;
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    //find the tags
    try {
      tags = await this.tagsService.findMutipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'when not find multiple tags from database',
        },
      );
    }

    console.log(tags, patchPostDto.tags.length);

    // if (!tags || tags.length !== patchPostDto.tags.length) {
    if (!tags) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
        {
          description: 'Bad Request',
        },
      );
    }

    //find the post
    try {
      post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'when not find post given post id from database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException('Post ID does not Exists', {
        description: 'Bad Request',
      });
    }

    //update the post properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // post = {
    //   ...post,
    //   ...patchPostDto,
    // };
    // Object.assign(post, {
    //   ...patchPostDto,
    //   tags: tags,
    // });

    //assign the new tags
    post.tags = tags;

    //save the post and return
    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'when not save post to database',
        },
      );
    }
    return post;
  }

  /**
 *  one to one relation unidirectional example

  public async deletePost(id: number) {
    //find the post
    let post = await this.postRepository.findOneBy({ id });
    //deleting the post
    await this.postRepository.delete(id);
    //delete meta options
    await this.metaOptionsRepository.delete(post.metaOptions.id);
    confirm

    return {
      deleted: true,
      id,
    };
  }

 */

  public async deletePost(id: number) {
    /*
      * bidirection delete without cascade means soft delete
    console.log(id);
    let post = await this.postRepository.findOneBy({ id });
    console.log(post);
    let inversePost = await this.metaOptionsRepository.find({
      where: {
        id: post.metaOptions.id,
      },
      relations: {
        post: true,
      },
    });

    console.log(inversePost);

    return {
      deleted: true,
      id,
    };
    */

    //Cascade Delete With Bi-Directional Relationship

    //  deleting the post
    await this.postRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }
}
