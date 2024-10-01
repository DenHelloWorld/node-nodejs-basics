import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const content = await fs.readFile(fileToReadPath, 'utf-8');
    return content;
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
