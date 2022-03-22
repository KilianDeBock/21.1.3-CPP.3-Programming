import 'dotenv/config';

import typeorm from 'typeorm';

const { createConnection, getConnection } = typeorm;

// connect to database
export default class DatabaseSeeder {
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

  async run(factory, amount = 1) {
    // Connect to the database
    await this.connect();

    if (amount > 1) {
      await factory.makeMany(amount);
    } else {
      await factory.make(amount);
    }
    return factory.inserted;

  }
}