import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, EventAction, EventMiddleWare } from 'fj-event-store';
import { EventStoreCoreModule } from './event-store-core.module';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { projectionMiddleware } from 'fj-event-store';
import { eventBusMiddleware } from './middlewere/event-bus-middleware';

@Module({
  imports: [CqrsModule],
})
export class EventStoreModule {
  static forRoot(options: Configuration): DynamicModule {
    const middlewareProvider = {
      provide: 'middleware',
      useFactory: async (eventBus: EventBus): Promise<EventMiddleWare[]> => {
        return [
          { action: EventAction.APPENDED, handler: projectionMiddleware() },
          { action: EventAction.APPENDED, handler: eventBusMiddleware(eventBus) },
        ];
      },
      inject: [EventBus],
    };

    return {
      module: EventStoreModule,
      providers: [middlewareProvider],
      imports: [EventStoreCoreModule.forRootAsync(options, middlewareProvider)],
    };
  }
}
