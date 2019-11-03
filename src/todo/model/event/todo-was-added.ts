import { BaseEvent } from 'fj-event-store';

interface TodoPayload {
  task: string;
  description: string;
  date: string;
}

export class TodoWasAdded extends BaseEvent<TodoPayload> {
  static with(todoId: string, task: string, description: string, date: Date) {
    return this.occur(todoId, { task, description, date: date.toString() });
  }

  get todoId() {
    return this.aggregateId;
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
