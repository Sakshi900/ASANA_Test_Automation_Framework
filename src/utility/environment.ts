import dotenv from 'dotenv';

dotenv.config();

export function getEnvironment(): string {
  const environment = process.env.TEST_ENV;
  if (!environment) {
    throw new Error('Environment is not defined');
  }
  return environment;
}
