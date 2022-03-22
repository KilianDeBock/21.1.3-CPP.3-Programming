import "dotenv/config";
import entities from "../../models/index.js";

import typeorm from "typeorm";
const { createConnection, getConnection } = typeorm;

// connect to database
class DatabaseSeeder {
  constructor(type, database, entities) {
    this.type = type;
    this.database = database;
    this.entities = entities;
  }

  async connect() {
    const connection = await createConnection({
      type: this.type,
      database: this.database,
      entities: this.entities,
      synchronize: true,
    });
  }
}
