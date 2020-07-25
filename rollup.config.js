import prodConfig from './rollup.prod.config';
import devConfig from './rollup.dev.config';

const production = !process.env.ROLLUP_WATCH;

export default async () => {
  const config = production ? prodConfig : devConfig;

  return config();
};
