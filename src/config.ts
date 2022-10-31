import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbHost: process.env.TYPEORM_HOST,
      dbPort: parseInt(process.env.TYPEORM_PORT, 10),
      dbUser: process.env.TYPEORM_USERNAME,
      dbPassword: process.env.TYPEORM_PASSWORD,
      dbName: process.env.TYPEORM_DATABASE,
    },
  };
});
