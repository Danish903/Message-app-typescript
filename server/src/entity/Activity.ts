import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Activity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;
  @ManyToOne(() => User, user => user.userActivities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  senderId: string;
  @ManyToOne(() => User, user => user.activitySender)
  @Field(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  postId: string;
  @ManyToOne(() => Post, post => post.postActivities)
  @JoinColumn({ name: 'postId' })
  @Field(() => Post)
  post: Post;

  @Field()
  @Column('varchar', { length: 255 })
  type: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
