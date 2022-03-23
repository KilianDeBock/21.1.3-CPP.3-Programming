import Factory from './Factory.js';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import typeorm from 'typeorm';

const { createConnection, getConnection } = typeorm;

class ZooFactory extends Factory {
  constructor() {
    super();
    this.scrapeURL = 'https://en.wikipedia.org/wiki/List_of_zoos_by_country';
    this.zoos = [];
  }

  async make() {
    await this.scrape();
    await this.makeMany();
  }

  // Get free data with wikiyea
  async scrape() {
    const r = await fetch(this.scrapeURL);
    const webpage = await r.text();
    const $ = cheerio.load(webpage);

    const ulAfterH3 = $('h3 + ul');
    ulAfterH3.each((ind, tag) => {
      const zooTags = $(tag).find('li > a');
      zooTags.each((ind, ztag) => {
        const zooName = $(ztag).text();
        this.zoos.push(zooName);
      });
    });
  }

  // Make many records
  async makeMany() {
    // for every zo, do an insert
    for (const type of this.zoos) {
      const record = await this.insert(type);
      this.inserted.push(record);
    }
  }

  async insert(name) {
    const repo = getConnection().getRepository('Zoo');

    // record exists?
    let record = await repo.findOne({ where: { name } });
    if (record) return record;

    // create record
    record = await repo.save({ name });

    // return
    return record;
  }
}

export default new ZooFactory();