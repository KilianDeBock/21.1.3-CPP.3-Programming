import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Type",
  tableName: "types",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    animals: {
      target: "Animal",
      type: "one-to-many",
      cascade: true,
      inverseSide: "type",
    },
  },
});
