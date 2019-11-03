import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTodo } from '../command';
import { TodoService } from '../todo.service';

@CommandHandler(CompleteTodo)
export class CompleteTodoHandler implements ICommandHandler<CompleteTodo> {
  constructor(private readonly todoService: TodoService) {}

  async execute({ todoId }: CompleteTodo) {
    const todo = await this.todoService.repository.get(todoId);
    await this.todoService.repository.save(todo.complete());
  }
}
