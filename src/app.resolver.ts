import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  firstName?: string;
}

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  async user(): Promise<User> {
    return { id: 1, firstName: 'Gus' };
  }
}
