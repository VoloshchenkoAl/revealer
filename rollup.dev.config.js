import typescript from '@rollup/plugin-typescript';
import tslint from 'rollup-plugin-tslint';
import serve from 'rollup-plugin-serve';

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
        serve({
            open: true,
            port: 3031,
            contentBase: 'docs',
        }),
    ]
});
