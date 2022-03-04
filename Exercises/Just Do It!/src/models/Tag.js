import typeorm from 'typeorm';

const {EntitySchema} = typeorm;

export default new EntitySchema({
  name: 'Tag',
  tableName: 'tags',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    task: {
      type: 'int',
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    task: {
      target: 'Task',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'tasks',
    },
  },
});
