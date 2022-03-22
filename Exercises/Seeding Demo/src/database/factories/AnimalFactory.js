import Factory from './Factory.js';
import typeorm from 'typeorm';
import TypeFactory from './TypeFactory.js';
import animal from '@fakerjs/animal';
import { faker } from '@faker-js/faker';


const { createConnection, getConnection } = typeorm;

class AnimalFactory extends Factory {
  constructor() {
    super();
    this.types = TypeFactory.types;
  }

  // Make one record
  async make() {
    // Make them all
    const randInd = Math.floor(Math.random() * this.types.length);
    const randType = this.types[randInd];

    const randAnimal = animal(randType);
    console.log(randAnimal, randType);

    const beast = {
      name: randAnimal,
      color: faker.commerce.color,
      latinName: faker.lorem.word(),
      isFluffy: faker.datatype.boolean(),
    };

    console.log(beast);

    const record = await this.insert(beast, randType);
  }

  async insert(animal, type) {
    const repo = getConnection().getRepository('Animal');

    // Record exists?
    let record = await repo.findOne({ where: { name: animal.name } });
    if (record) return record;

    const typeRecord = await TypeFactory.insert(type);

    // Create record
    record = await repo.save({
      name: animal.name,
      color: animal.color,
      latinName: animal.latinName,
      isFluffy: animal.isFluffy,
      type: {
        id: typeRecord.id,
      },
    });

    console.log(record);

    // Return
    return record;
  }
}

export default new AnimalFactory();