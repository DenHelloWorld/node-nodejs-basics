const parseArgs = () => {
  const args = process.argv.slice(2);

  const result = args
    .map((arg, index) => {
      if (arg.startsWith('--') && args[index + 1]) {
        const key = arg.substring(2);
        const value = args[index + 1];
        return `${key} is ${value}`;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  process.stdout.write(result + '\n');
};

parseArgs();
