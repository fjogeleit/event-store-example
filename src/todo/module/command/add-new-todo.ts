import { TodoBody } from '../todo.service';

export class AddNewTodo {
  private readonly _payload;

  constructor(payload: TodoBody) {
    // @TODO property validation
    if (isNaN(Date.parse(payload.date))) {
      throw new Error('Invalid date');
    }

    this._payload = payload;
  }

  get todoId() {
    return this._payload.todoId;
  }

  get task() {
    return this._payload.task;
  }

  get description() {
    return this._payload.description;
  }

  get date() {
    return new Date(this._payload.date);
  }
}
