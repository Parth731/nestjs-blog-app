import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    default: postType.POST,
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    default: postStatus.DRAFT,
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', //datetime in mysql
    nullable: true,
  })
  publishOn?: Date;

  @ManyToMany(() => Tag, (tags) => tags.posts, {
    eager: true,
  })
  @JoinTable()
  tags?: Tag[];

  /** 
   * one to one relationship unidirectional
    @OneToOne(() => MetaOptions, {
      // cascade: ['remove', 'insert'],
      cascade: true,
      eager: true,
    })
  */
  //one to one relationship of bi-directional
  @OneToOne(() => MetaOptions, (metaOptions) => metaOptions.post, {
    // cascade: ['remove', 'insert'],
    cascade: true,
    eager: true,
  })
  // @JoinColumn()
  metaOptions?: MetaOptions;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;
}
