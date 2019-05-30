import { Resolver, Mutation, Arg, Ctx, ObjectType, Field } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';

export const JWT_SECRET = 'fasdfasdfasdfasdf';
@Resolver()
@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  user?: User;
  @Field({ nullable: true })
  token?: string;
}
class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error('Invalid password!');
    // if (!user.confirmed) return null;

    ctx.req.session!.userId = user.id;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7 days'
    });

    return {
      user,
      token
    };
  }
}

export { LoginResolver as default };
