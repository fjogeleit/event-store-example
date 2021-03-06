import { BaseEvent } from 'fj-event-store';

export class CompletionWasReverted extends BaseEvent<{}> {
  static for(todoId: string) {
    return this.occur(todoId, {});
  }

  get todoId() {
    return this.aggregateId;
  }
}
