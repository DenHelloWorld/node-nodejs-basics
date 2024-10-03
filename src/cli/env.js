const parseEnv = () => {
  const rssKeys = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  process.stdout.write(rssKeys + '\n');
};

parseEnv();
