import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from '../messages.service';
import { PrismaClient } from '.prisma/client';
import { CreateMessageDto } from '../dto/create-message.input';
import { Message } from '../entities/message.entity';
import { UpdateMessageDto } from '../dto/update-message.input';
const prisma = new PrismaClient();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessagesService) {}

  @Query(() => Message)
  async findOne(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Query(() => [Message])
  async findAll() {
    return prisma.message.findMany();
  }

  @Mutation(() => Message)
  async create(
    @Args('createMessage') newMessage: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.create(newMessage);
  }

  @Mutation(() => Message)
  async update(
    @Args('id') id: string,
    @Args('updateMessage') message: UpdateMessageDto,
  ) {
    return this.messageService.update(id, message);
  }

  @Mutation(() => Message)
  async remove(@Args('id') id: string) {
    return this.messageService.remove(id);
  }
}
