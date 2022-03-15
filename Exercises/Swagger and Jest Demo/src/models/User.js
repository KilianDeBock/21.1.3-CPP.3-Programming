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
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
  },
  relations: {
    interests: {
      target: "Interest",
      type: "many-to-many",
      joinTable: true,
      cascade: true
    },
    user_meta: {
      target: "UserMeta",
      type: "one-to-one",
      cascade: true,
      joinColumn: true
    },
    roles: {
      target: "Role",
      type: "one-to-many",
      cascade: true,
      inverseSide: 'user'
    }
  }
});
