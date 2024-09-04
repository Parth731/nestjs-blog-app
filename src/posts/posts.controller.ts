import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post.dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { ActiveUser } from 'src/auth/decoarators/active-user-decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  // injecting posts service
  constructor(private readonly postsService: PostsService) {}

  //get localhost:3000/posts/:userId
  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: number,
    @Query() postQuery: GetPostDto,
  ) {
    return this.postsService.findPostsByUserId(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.postsService.createPost(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.postsService.deletePost(id);
  }
}
