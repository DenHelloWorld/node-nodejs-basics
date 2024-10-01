import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesDir = path.join(__dirname, 'files');
  const wrongFilePath = path.join(filesDir, 'wrongFilename.txt');
  const properFilePath = path.join(filesDir, 'properFilename.md');

  const wrongFileExists = fs
    .access(wrongFilePath)
    .then(() => true)
    .catch(() => false);

  const properFileExists = fs
    .access(properFilePath)
    .then(() => true)
    .catch(() => false);

  const [wrongExists, properExists] = await Promise.all([
    wrongFileExists,
    properFileExists,
  ]);

  if (!wrongExists || properExists) {
    throw new Error('FS operation failed');
  }

  await fs.rename(wrongFilePath, properFilePath);
};

await rename();
