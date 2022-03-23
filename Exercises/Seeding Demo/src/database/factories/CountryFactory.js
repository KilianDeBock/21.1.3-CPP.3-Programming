import Factory from './Factory.js';
import { faker } from '@faker-js/faker';
import typeorm from 'typeorm';

const { createConnection, getConnection } = typeorm;

class CountryFactory extends Factory {
  constructor() {
    super();
  }

  // make one record
  async make() {
    const randomCountry = faker.address.country();

    const record = await this.insert(randomCountry);
    this.inserted.push(record);
  }

  async insert(name) {
    const repo = getConnection().getRepository('Country');

    // record exists?
    let record = await repo.findOne({ where: { name } });
    if (record) return record;

    // create record
    record = await repo.save({ name });

    // return
    return record;
  }
}

export default new CountryFactory();