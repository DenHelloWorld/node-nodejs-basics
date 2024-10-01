import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const content = await fs.readFile(fileToReadPath, 'utf-8');
    console.log(content);
  } catch {
    console.error('FS operation failed');
  }
};

await read();
