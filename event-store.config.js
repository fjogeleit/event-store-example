const { Todo } = require('./dist/todo/model/todo')
const { TodoListProjection } = require('./dist/todo/projection/todo-list-projection')

module.exports = {
  connectionString: 'postgres://user:password@localhost:5434/event-store',
  aggregates: [Todo],
  projections: [TodoListProjection]
}
