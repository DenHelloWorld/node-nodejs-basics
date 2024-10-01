import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesDir = join(__dirname, 'files');

  try {
    await fs.access(filesDir);
    const files = await fs.readdir(filesDir);
    process.stdout.write(files.join('\n') + '\n');
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
