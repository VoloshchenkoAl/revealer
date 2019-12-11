import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import tslint from 'rollup-plugin-tslint';

export default () => ({
    input: 'src/index.ts',
    output: {
        name: 'revealer',
        file: 'dist/cjs/src/index.js',
        format: 'cjs',
    },
    plugins: [
        tslint(),
        typescript({ tsconfig: './tsconfig.json' }),
        terser(),
    ]
});
