import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  id: string;
}
