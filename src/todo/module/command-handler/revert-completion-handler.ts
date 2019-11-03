import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RevertCompletion } from '../command';
import { TodoService } from '../todo.service';

@CommandHandler(RevertCompletion)
export class RevertCompletionHandler implements ICommandHandler<RevertCompletion> {
  constructor(private readonly todoService: TodoService) {}

  async execute({ todoId }: RevertCompletion) {
    const todo = await this.todoService.repository.get(todoId);
    await this.todoService.repository.save(todo.revertCompletion());
  }
}
