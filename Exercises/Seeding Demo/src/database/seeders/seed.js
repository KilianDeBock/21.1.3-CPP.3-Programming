// Imports
import entities from '../../models/index.js';
import DatabaseSeeder from './DatabaseSeeder.js';
import AnimalFactory from '../factories/AnimalFactory.js';

// New instance of db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities,
);

// dbSeeder.run(TypeFactory).then(records => {
//   console.log(`${records.length} seeded in db`);
//   console.log(records);
// });


dbSeeder.run(AnimalFactory, 50).then(records => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});
