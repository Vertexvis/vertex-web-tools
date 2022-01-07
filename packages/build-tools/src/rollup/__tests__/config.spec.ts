import path from 'path';

import { config, defineConfig } from '../config';
import { external } from '../external';
import { input } from '../input';
import { output } from '../output';
import { resolve } from '../resolve';
import { typescript } from '../typescript';

describe(defineConfig, () => {
  it('should consolidate plugin configuration', () => {
    const config = defineConfig(
      resolve({ commonjs: { ignoreGlobal: true } }),
      resolve({ resolve: { browser: true } })
    );

    expect(config.plugins).toMatchObject({
      resolve: {
        commonjs: { ignoreGlobal: true },
        resolve: { browser: true },
      },
    });
  });
});

describe(config, () => {
  const packageJsonPath = path.resolve(__dirname, 'package.json');

  it('should not externalize peer dependencies if peer deps disabled', () => {
    const rollup = config(
      external({ peerDependencies: false, packageJsonPath })
    );

    expect(rollup.external).toEqual([]);
  });

  it('should externalize modules if peer deps enabled', () => {
    const rollup = config(
      external({
        dependencies: true,
        peerDependencies: true,
        modules: ['foo'],
        packageJsonPath,
      })
    );

    expect(rollup.external).toEqual(
      expect.arrayContaining(['foo', 'foo-dep', 'foo-peer-dep'])
    );
  });

  it('should prevent plugin duplication', () => {
    const rollup = config(typescript(), typescript());

    expect(rollup.plugins).toEqual([expect.objectContaining({ name: 'rpt2' })]);
  });

  it('should include resolve and commonjs plugins', () => {
    const rollup = config(resolve());

    console.log(rollup.plugins);

    expect(rollup.plugins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'commonjs' }),
        expect.objectContaining({ name: 'node-resolve' }),
      ])
    );
  });

  it('should generate a valid rollup config', () => {
    const rollup = config(
      input('src/index.ts'),
      output({ formats: ['esm'], minify: true }),
      typescript()
    );

    expect(rollup).toEqual(
      expect.objectContaining({
        input: 'src/index.ts',
        output: [
          expect.objectContaining({
            file: 'dist/bundle.esm.js',
            format: 'esm',
          }),
          expect.objectContaining({
            file: 'dist/bundle.esm.min.js',
            format: 'esm',
            plugins: expect.arrayContaining([
              expect.objectContaining({ name: 'terser' }),
            ]),
          }),
        ],
        plugins: [expect.objectContaining({ name: 'rpt2' })],
      })
    );
  });
});
