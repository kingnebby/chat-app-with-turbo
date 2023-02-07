import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMessageDto } from './create-message.input';

@InputType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
