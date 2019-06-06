import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity
} from 'typeorm';
import { Field, ID, ObjectType, Root, Ctx } from 'type-graphql';
import { User } from './User';
import { Post } from './Post';
import { MyContext } from 'src/types/MyContext';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  text: string;

  @Field(() => ID)
  @Column('uuid')
  userId: string;
  @ManyToOne(() => User, user => user.comments)
  user: User;

  @Field(() => ID)
  @Column('uuid')
  postId: string;
  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @Field(() => User, { nullable: true })
  async sender(@Root() parent: Comment, @Ctx() ctx: MyContext): Promise<User> {
    return ctx.userLoader.load(parent.userId);
  }

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
