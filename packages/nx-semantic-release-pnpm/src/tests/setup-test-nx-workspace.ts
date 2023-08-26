import { ensureNxProject, tmpProjPath } from '@nx/plugin/testing';
import fs from 'fs-extra';
import { cleanupTestRepo } from './cleanup-test-repo';

export async function setupTestNxWorkspace() {
  try {
    await cleanupTestRepo();

    console.info('Setting up at test nx workspace at:', tmpProjPath());

    const distPath = 'dist/packages/nx-semantic-release-pnpm';

    if (!fs.existsSync(distPath)) {
      throw new Error(`Nx plugin dist folder does not exist at: ${distPath}`);
    }

    ensureNxProject('@ruscon/nx-semantic-release-pnpm', distPath);
  } catch (error) {
    console.error('Failed to setup test Nx workspace', error);

    throw error;
  }
}
