import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, './files/fileToRead.txt');

const read = async () => {
  const readableStream = new Readable({
    async read() {
      try {
        const fileToReadData = await fs.promises.readFile(fileToRead, 'utf-8');
        this.push(fileToReadData);
        this.push(null);
      } catch (error) {
        this.destroy(new Error(`Error reading file: ${error.message}`));
      }
    },
  });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on('error', (error) => {
    process.stderr.write(`Error: ${error.message}\n`);
  });

  readableStream.on('close', () => {
    process.stdout.write('\nFinished reading the file.\n');
  });
};

await read();
