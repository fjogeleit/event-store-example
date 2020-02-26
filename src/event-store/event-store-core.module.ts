import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { EventMiddleWare } from 'fj-event-store';
import { createPostgresEventStore, PostgresConfiguration } from 'fj-event-store/postgres';
import { EVENT_STORE } from './constants';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [CqrsModule],
})
export class EventStoreCoreModule {
  static forRootAsync(options: PostgresConfiguration, middleWareProvider: Provider<Promise<EventMiddleWare[]>>): DynamicModule {

    const eventStoreProvider = {
      provide: EVENT_STORE,
      useFactory: async (middleware: EventMiddleWare[]) => {
        options.middleware = [...(options.middleware || []), ...middleware];

        const eventStore = createPostgresEventStore(options);
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
