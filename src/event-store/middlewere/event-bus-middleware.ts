import { EventCallback } from 'fj-event-store';
import { EventBus } from '@nestjs/cqrs';

export const eventBusMiddleware = (eventBus: EventBus): EventCallback => (event) => {
  eventBus.publish(event);

  return event;
};
