import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  message: string;
  authorId: string;
  conversationId: string;
}
