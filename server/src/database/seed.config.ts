import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dataSource from './typeorm.config';

const options: SeederOptions = {
  seeds: ['src/database/seeds/**/*.ts'],
};

export default new DataSource({
  ...dataSource.options,
  ...options,
});
