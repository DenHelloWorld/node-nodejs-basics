import { Transform } from 'stream';

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      this.push(reversed + '\n');
      callback();
    },
  });
  process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();
