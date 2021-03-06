import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoModule } from './todo/module/todo.module';
import { EventStoreModule } from './event-store';
import { Configuration } from 'fj-event-store';

const options: Configuration = require('../event-store.config.js');

@Module({
  imports: [TodoModule, EventStoreModule.forRoot(options)],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
