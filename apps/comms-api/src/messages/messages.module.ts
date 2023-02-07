import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { EventsModule } from 'src/events/events.module';
import { MessageResolver } from './graphql/message.resolver';

@Module({
  imports: [EventsModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessageResolver],
})
export class MessagesModule {}
