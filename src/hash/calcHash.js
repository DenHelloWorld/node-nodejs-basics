import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  try {
    await pipeline(stream, hash);
    console.log(hash.digest('hex'));
  } catch (error) {
    console.error('Error calculateHash:', error);
  }
};

await calculateHash();
