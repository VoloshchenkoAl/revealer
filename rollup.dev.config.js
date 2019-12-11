import typescript from '@rollup/plugin-typescript';
import tslint from 'rollup-plugin-tslint';

export default () => ({
    input: 'src/index.ts',
    output: {
        name: 'revealer',
        file: 'docs/revealer.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        tslint(),
        typescript(),
    ]
});
