import typeorm from 'typeorm';

const {EntitySchema} = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
  },
  relations: {
    categories: {
      target: 'Category',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'categories',
    },
  },
});
