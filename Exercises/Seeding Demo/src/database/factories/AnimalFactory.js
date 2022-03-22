import Factory from './Factory.js';
import TypeFactory from './TypeFactory.js';
import { faker } from '@faker-js/faker';
import animal from '@fakerjs/animal';
import typeorm from 'typeorm';

const { createConnection, getConnection } = typeorm;

class AnimalFactory extends Factory {
  constructor() {
    super();
    this.types = TypeFactory.types;
  }

  // make one record
  async make() {
    const randInd = Math.floor(Math.random() * this.types.length);
    const randType = this.types[randInd];

    const randAnimal = animal(randType);

    const beast = {
      name: randAnimal,
      color: faker.commerce.color(),
      latinName: faker.lorem.word(),
      isFluffy: faker.datatype.boolean(),
    };

    const record = await this.insert(beast, randType);

    this.inserted.push(record);
  }

  async insert(animal, type) {
    const repo = getConnection().getRepository('Animal');

    // record exists?
    let record = await repo.findOne({ where: { name: animal.name } });
    if (record) return record;

    const typeRecord = await TypeFactory.insert(type);

    // create record
    record = await repo.save({
      name: animal.name,
      color: animal.color,
      latinName: animal.latinName,
      isFluffy: animal.isFluffy,
      type: {
        id: typeRecord.id,
      },
    });

    // return
    return record;
  }
}

export default new AnimalFactory();