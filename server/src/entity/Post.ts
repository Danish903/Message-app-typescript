import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne
} from "typeorm";
import { ObjectType, Field, ID, Root, Ctx } from "type-graphql";
import { User } from "./User";
import { MyContext } from "src/types/MyContext";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Field()
   @Column()
   description: string;

   @Field({ nullable: true })
   @Column("text", { nullable: true })
   photoUrl?: string;

   @Column("uuid")
   userId: string;
   @ManyToOne(() => User, user => user.posts)
   user: User;

   @Field(() => User)
   async owner(@Root() parent: Post, @Ctx() ctx: MyContext): Promise<User> {
      return await ctx.userLoader.load(parent.userId);
   }

   @Field(() => Date)
   @CreateDateColumn()
   created_at: Date;
   @Field(() => Date)
   @UpdateDateColumn()
   updated_at: Date;
}
