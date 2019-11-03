import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoWasAdded } from '../../model/event';
import { AddNewTodo } from '../command';

@EventsHandler(TodoWasAdded)
export class LogNewTodo implements IEventHandler<AddNewTodo> {
  async handle(event: AddNewTodo) {
    // tslint:disable-next-line:no-console
    console.log(event);
  }
}
