import { CompletionWasReverted, TodoWasAdded, TodoWasCompleted } from '../model/event';
import { AbstractProjection, IProjector, Projection } from 'fj-event-store';

export interface TodoListState {
  [id: string]: { id: string, task: string, date: string, checked: boolean };
}

@Projection('todo_list')
export class TodoListProjection extends AbstractProjection<TodoListState> {
  project(): IProjector<TodoListState> {
    return this
      .projector
      .fromStream({ streamName: 'todos' })
      .init(() => ({}))
      .when({
        [TodoWasAdded.name]: (state, event: TodoWasAdded): TodoListState => {
          return { ...state, [event.todoId]: { id: event.todoId, task: event.task, date: event.date.toString(), checked: false } };
        },
        [TodoWasCompleted.name]: (state, event: TodoWasCompleted): TodoListState => {
          return { ...state, [event.todoId]: { ...state[event.todoId], checked: true } };
        },
        [CompletionWasReverted.name]: (state, event: CompletionWasReverted): TodoListState => {
          return { ...state, [event.todoId]: { ...state[event.todoId], checked: false } };
        },
      });
  }
}
