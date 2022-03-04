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
    name: {
      type: 'varchar',
    },
    order: {
      type: 'int',
      default: 0
    }
  },
  relations: {
    tasks: {
      target: 'Task',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'tags',
    },
  },
});
