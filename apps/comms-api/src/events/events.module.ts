import { Module } from '@nestjs/common';
import { ChatConfigService } from 'src/config.service';
import { EventsGateway } from './events.gateway';

@Module({
  exports: [EventsGateway],
  providers: [EventsGateway, ChatConfigService],
})
export class EventsModule {}
