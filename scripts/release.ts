import { logger } from '@nx/devkit';
import { exec } from '../packages/nx-semantic-release-pnpm/src/utils/exec';

async function main() {
  logger.log('Starting package release...');

  await exec('pnpm run build:skip-cache', {
    verbose: true,
  });

  // await exec('pnpm link dist/packages/nx-semantic-release-pnpm');
  // await exec('pnpm install');

  await exec('pnpm nx run nx-semantic-release-pnpm:semantic-release --verbose', {
    verbose: true,
  });

  logger.log('Package released!');
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
