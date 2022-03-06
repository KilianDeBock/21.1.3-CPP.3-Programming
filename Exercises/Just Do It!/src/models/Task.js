import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    completed: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    categories: {
      target: "Category",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "tasks",
    },
    tags: {
      target: "Tag",
      type: "one-to-many",
      cascade: true,
      inverseSide: "tasks",
    },
  },
});
