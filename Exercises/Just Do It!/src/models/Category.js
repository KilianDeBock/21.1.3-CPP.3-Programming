/**
 * Our navigationItem
 */

import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    url: {
      type: "varchar",
    },
    text: {
      type: "varchar",
    },
  },
});
