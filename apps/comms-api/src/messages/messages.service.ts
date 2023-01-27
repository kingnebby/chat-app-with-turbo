import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaClient } from '.prisma/client';
import { EventsGateway } from 'src/events/events.gateway';
const prisma = new PrismaClient();

@Injectable()
export class MessagesService {
  constructor(private eventsGateway: EventsGateway) {}

  async create(createMessageDto: CreateMessageDto) {
    const result = await prisma.message.create({
      data: {
        message: createMessageDto.message,
        Author: { connect: { id: createMessageDto.authorId } },
        Conversation: { connect: { id: createMessageDto.conversationId } },
      },
    });
    this.eventsGateway.sendMessage(result);
    return result;
  }

  findAll() {
    return prisma.message.findMany();
  }

  findOne(id: string) {
    return prisma.message.findUnique({ where: { id } });
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return prisma.message.update({
      data: { ...updateMessageDto },
      where: { id },
    });
  }

  remove(id: string) {
    return prisma.message.delete({ where: { id } });
  }
}
