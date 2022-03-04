import typeorm from 'typeorm';

const {EntitySchema} = typeorm;

export default new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
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
    categories: {
      target: 'Category',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'categories',
    },
    tags: {
      target: 'Tag',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'tags',
    },
  },
});
