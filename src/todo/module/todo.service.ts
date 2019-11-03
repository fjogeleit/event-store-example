import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoRepository } from '../model/todo-repository';
import { AddNewTodo, CompleteTodo, RevertCompletion } from './command';
import { GetTodos } from './query';

export interface TodoBody {
  todoId: string;
  task: string;
  description: string;
  date: string;
}

@Injectable()
export class TodoService {
  public readonly repository: TodoRepository;

  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {
    this.repository = new TodoRepository();
  }

  addTodo(payload: TodoBody) {
    return this.commandBus.execute(new AddNewTodo(payload));
  }

  listTodos() {
    return this.queryBus.execute(new GetTodos());
  }

  completeTodo(todoId: string) {
    return this.commandBus.execute(new CompleteTodo(todoId));
  }

  revertCompletion(todoId: string) {
    return this.commandBus.execute(new RevertCompletion(todoId));
  }
}
