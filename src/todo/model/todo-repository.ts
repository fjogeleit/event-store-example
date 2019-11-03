import { AggregateRepository } from 'fj-event-store';
import { Todo } from './todo';
import { Repository } from 'fj-event-store';

@Repository({ streamName: 'todos', aggregate: Todo })
export class TodoRepository extends AggregateRepository<Todo> {}
