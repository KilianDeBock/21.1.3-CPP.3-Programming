import typeorm from 'typeorm';

const {EntitySchema} = typeorm;

export default new EntitySchema({
  name: 'Category',
  tableName: 'categories',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    users: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'categories',
    },
    tasks: {
      target: 'Task',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'categories',
    },
  },
});
