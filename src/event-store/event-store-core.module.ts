import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Configuration, createEventStore, EventMiddleWare } from 'fj-event-store';
import { EVENT_STORE } from './constants';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [CqrsModule],
})
export class EventStoreCoreModule {
  static forRootAsync(options: Configuration, middleWareProvider: Provider<Promise<EventMiddleWare[]>>): DynamicModule {

    const eventStoreProvider = {
      provide: EVENT_STORE,
      useFactory: async (middleware) => {
        options.middleware = [...(options.middleware || []), ...middleware];

        const eventStore = createEventStore(options);
        await eventStore.install();

        try {
          await eventStore.createStream('todos');
          // tslint:disable-next-line:no-empty
        } catch {}

        return eventStore;
      },
      inject: ['middleware'],
    };

    return {
      module: EventStoreCoreModule,
      providers: [middleWareProvider, eventStoreProvider],
      exports: [eventStoreProvider],
    };
  }
}
