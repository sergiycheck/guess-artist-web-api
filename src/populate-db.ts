import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CustomLogger } from './common/logger/custom-logger.service.js';
import { CustomConnectionService } from './common/resources/common/mongoose-connection.service.js';
import { DbInitializer } from './utils/seed-db.js';

export default async function populateDb(app: INestApplicationContext) {
  const configService = app.get(ConfigService);
  const populateEnv = +configService.get('POPULATE');
  const logger = app.get(CustomLogger);
  if (populateEnv === 1) {
    const connection = app.get(CustomConnectionService).getConnection();
    const dbInitializer = new DbInitializer(connection, logger);
    await dbInitializer.seedManyDocumentsIntoDb();
    logger.log('Db was successfully populated!');
  } else {
    logger.log('Population arg was not set to 0');
  }

  process.exit(0);
}
