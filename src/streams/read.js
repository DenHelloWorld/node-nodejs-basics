import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, './files/fileToRead.txt');

const read = async () => {
  const readableStream = fs.createReadStream(fileToRead, { encoding: 'utf-8' });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on('error', (error) => {
    process.stderr.write(`Error reading file: ${error.message}`);
  });

  readableStream.on('end', () => {
    process.stdout.write('\nFinished reading the file.');
  });
};

await read();
