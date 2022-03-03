import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Photo",
  tableName: "photos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    filename: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "photos",
    },
  },
});
