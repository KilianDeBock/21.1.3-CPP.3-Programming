import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Country",
  tableName: "countries",
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
    zoos: {
      target: "Zoo",
      type: "one-to-many",
      cascade: true,
      inverseSide: "country",
    },
  },
});
