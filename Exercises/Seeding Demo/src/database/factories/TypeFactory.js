import Factory from './Factory.js';
import typeorm from 'typeorm';


const { createConnection, getConnection } = typeorm;

class TypeFactory extends Factory {
  constructor() {
    super();
    this.types = ['ocean', 'desert', 'grassland', 'forest', 'farm', 'pet', 'zoo'];
  }

  // Make one record
  async make() {
    // Make them all
    await this.makeMany();
  }

  // Make many records
  async makeMany() {
    // for every type, do an insert
    for (const type of this.types) {
      const record = await this.insert(type);
      this.inserted.push(record);
    }
  }

  async insert(name) {
    const repo = getConnection().getRepository('Type');

    // Record exists?
    let record = await repo.findOne({ where: { name } });
    if (record) return record;

    // Create record
    record = await repo.save({ name });

    // Return
    return record;
  }
}

export default new TypeFactory();