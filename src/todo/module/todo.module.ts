import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import CommandHandler from './command-handler';
import QueryHandler from './query-handler';
import ProcessManager from './process-manager';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService,
    ...CommandHandler,
    ...QueryHandler,
    ...ProcessManager,
  ],
  imports: [CqrsModule],
})
export class TodoModule {}
