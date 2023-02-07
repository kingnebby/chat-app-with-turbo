import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  id: string;
  message: string;
  authorId: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}
