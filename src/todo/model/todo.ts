import { AbstractAggregate } from 'fj-event-store';
import { Aggregate } from 'fj-event-store';
import { TodoWasAdded, TodoWasCompleted, CompletionWasReverted } from './event';

@Aggregate([
  TodoWasAdded,
  TodoWasCompleted,
  CompletionWasReverted,
])
export class Todo extends AbstractAggregate {
  private _todoId: string;
  private _task: string;
  private _description: string;
  private _checked: boolean;
  private _date: Date;

  public static add(todoId: string, task: string, description: string, date: Date): Todo {
    const self = new this();
    self._recordThat(TodoWasAdded.with(todoId, task, description, date));

    return self;
  }

  public complete(): Todo {
    if (this.checked) {
      throw new Error('Task already checked');
    }

    this._recordThat(TodoWasCompleted.for(this.todoId));

    return this;
  }

  public revertCompletion(): Todo {
    if (!this.checked) {
      throw new Error('Task is not completed yet');
    }

    this._recordThat(CompletionWasReverted.for(this.todoId));

    return this;
  }

  protected _whenTodoWasAdded(event: TodoWasAdded) {
    this._todoId = event.aggregateId;
    this._task = event.task;
    this._description = event.description;
    this._date = event.date;
    this._checked = false;
  }

  protected _whenTodoWasCompleted(event: TodoWasCompleted) {
    this._checked = true;
  }

  protected _whenCompletionWasReverted(event: CompletionWasReverted) {
    this._checked = false;
  }

  get todoId(): string {
    return this._todoId;
  }

  get task(): string {
    return this._task;
  }

  get description(): string {
    return this._description;
  }

  get date(): Date {
    return this._date;
  }

  get checked(): boolean {
    return this._checked;
  }
}
