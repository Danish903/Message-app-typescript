import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID, Root, Ctx } from 'type-graphql';
import { User } from './User';
import { MyContext } from 'src/types/MyContext';
import { PostLike } from './PostLike';
import { Activity } from './Activity';
import { Comment } from './Comment';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  photoUrl?: string;

  @Column('uuid')
  userId: string;
  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Field(() => User)
  async owner(@Root() parent: Post, @Ctx() ctx: MyContext): Promise<User> {
    return await ctx.userLoader.load(parent.userId);
  }

  @Field()
  @Column('int', { default: 0 })
  likeCount: number;

  @OneToMany(() => PostLike, postLike => postLike.post)
  postLikes: PostLike[];
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Field(() => [User], { nullable: true })
  async likedUsers(@Ctx() ctx: MyContext): Promise<User[]> {
    return ctx.likedUsersLoader.load(this.id);
  }

  @OneToMany(() => Activity, activity => activity.post)
  postActivities: Activity[];

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
