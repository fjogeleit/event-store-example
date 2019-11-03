import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddNewTodo } from '../command';
import { Todo } from '../../model/todo';
import { TodoService } from '../todo.service';

@CommandHandler(AddNewTodo)
export class AddNewTodoHandler implements ICommandHandler<AddNewTodo> {
  constructor(private readonly todoService: TodoService) {}

  async execute({ todoId, task, description, date }: AddNewTodo) {
    const todo = Todo.add(todoId, task, description, date);

    await this.todoService.repository.save(todo);
  }
}
