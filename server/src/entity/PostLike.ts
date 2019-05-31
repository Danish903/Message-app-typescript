import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity()
export class PostLike extends BaseEntity {
  @PrimaryColumn()
  userId: string;
  @ManyToOne(() => User, user => user.userLikes, { primary: true })
  user: User;

  @PrimaryColumn('uuid')
  postId: string;
  @ManyToOne(() => Post, post => post.postLikes, { primary: true })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
