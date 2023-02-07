import { Args, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from '../messages.service';
import { Message } from './message.model';
import { PrismaClient } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.guard';
const prisma = new PrismaClient();

@Resolver(() => Message)
@UseGuards(GqlAuthGuard)
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
}
