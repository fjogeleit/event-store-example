import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodos } from '../query';
import { TodoListProjection, TodoListState } from '../../projection';
import { IEventStore } from 'fj-event-store';
import { Inject } from '@nestjs/common';
import { EVENT_STORE } from '../../../event-store/constants';

@QueryHandler(GetTodos)
export class GetTodosHandler implements IQueryHandler<GetTodos> {
  constructor(
    @Inject(EVENT_STORE) private readonly eventStore: IEventStore,
  ) {}

  async execute(query: GetTodos): Promise<Array<{ id: string, task: string, checked: boolean, date: string }>> {
    const projector = this.eventStore.getProjector<TodoListState>(TodoListProjection.projectionName);

    await projector.run(false);

    return Object.values(projector.getState());
  }
}
