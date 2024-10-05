import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Writable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToWrite = path.join(__dirname, './files/fileToWrite.txt');

const write = async () => {
  const writableStream = new Writable({
    write(chunk, encoding, callback) {
      try {
        fs.appendFileSync(fileToWrite, chunk, encoding);
        callback();
      } catch (error) {
        callback(new Error(error.message));
      }
    },
  });

  process.stdin.pipe(writableStream).on('error', (error) => {
    process.stderr.write(`Error write: ${error.message}`);
  });
};

await write();
