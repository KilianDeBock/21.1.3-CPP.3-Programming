import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Animal",
  tableName: "animals",
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
    type: {
      target: "Type",
      type: "many-to-one",
      joinColumn: true,
    },
    animals: {
      target: "Zoo",
      type: "many-to-many",
      joinTable: {
        name: "animal_zoo",
      },
      cascade: true,
    },
  },
});
