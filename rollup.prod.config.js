import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default () => ({
  input: 'src/index.ts',
  output: {
    name: 'revealer',
    file: 'dist/cjs/src/index.js',
    format: 'cjs',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' }), terser()],
});
