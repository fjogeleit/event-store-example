import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TodoRepository } from '../model/todo-repository';
import { TodoBody, TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private repository: TodoRepository;

  constructor(private readonly todoService: TodoService) {
    this.repository = new TodoRepository();
  }

  @Get('list')
  async list(@Param() params: { task: string }): Promise<any> {
    return this.todoService.listTodos();
  }

  @Post('add')
  async add(@Body() todo: TodoBody): Promise<object> {
    try {
      await this.todoService.addTodo(todo);
    } catch (error) {
      return { error: error.message };
    }

    return { content: 'Success' };
  }

  @Post('complete')
  async complete(@Body('todoId') todoId: string): Promise<object> {
    try {
      await this.todoService.completeTodo(todoId);
    } catch (error) {
      return { error: error.message };
    }

    return { content: 'Success' };
  }

  @Post('revert-completion')
  async revertCompletion(@Body('todoId') todoId: string): Promise<object> {
    try {
      await this.todoService.revertCompletion(todoId);
    } catch (error) {
      return { error: error.message };
    }

    return { content: 'Success' };
  }
}
