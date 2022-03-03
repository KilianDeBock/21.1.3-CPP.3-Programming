/**
 * Our navigationItem
 */

import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "User",
  tableName: "users",
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
    user_meta: {
      target: "UserMeta",
      type: "one-to-one",
      cascade: true,
      joinColumn: true,
    },
    interests: {
      target: "Interest",
      type: "many-to-many",
      cascade: true,
      joinTable: true,
    },
    photos: {
      target: "Photo",
      type: "one-to-many",
      cascade: true,
      inverseSide: "user",
    },
  },
});
