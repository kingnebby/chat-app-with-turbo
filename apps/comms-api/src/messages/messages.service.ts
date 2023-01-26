import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class MessagesService {
  create(createMessageDto: CreateMessageDto) {
    return prisma.message.create({
      data: {
        message: createMessageDto.message,
        Author: { connect: { id: createMessageDto.authorId } },
        Conversation: { connect: { id: createMessageDto.conversationId } },
      },
    });
  }

  findAll() {
    return prisma.message.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
