import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PagainationModule } from 'src/common/pagination/pagaination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports: [
    UsersModule,
    TagsModule,
    PagainationModule,
    TypeOrmModule.forFeature([Post, MetaOptions]),
  ],
})
export class PostsModule {}
