import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesDir = path.join(__dirname, 'files');
  const fileToRemovePath = path.join(filesDir, 'fileToRemove.txt');

  try {
    await fs.access(fileToRemovePath);
  } catch {
    throw new Error('FS operation failed');
  }

  await fs.unlink(fileToRemovePath);
};

await remove();
