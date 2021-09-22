import { autoExternal } from '../autoExternal';
import { commonJs } from '../commonJs';
import { config, defineConfig } from '../config';
import { input } from '../input';
import { output } from '../output';
import { typescript } from '../typescript';

describe(defineConfig, () => {
  it('should consolidate plugin configuration', () => {
    const config = defineConfig(
      commonJs({ commonjs: { ignoreGlobal: true } }),
      commonJs({ nodeResolve: { browser: true } })
    );

    expect(config.plugins).toMatchObject({
      commonJs: {
        commonjs: { ignoreGlobal: true },
        nodeResolve: { browser: true },
      },
    });
  });
});

describe(config, () => {
  it('should not include peer dependencies by default', () => {
    const rollup = config();

    expect(rollup.plugins).toEqual([
      expect.objectContaining({ name: 'peer-deps-external' }),
    ]);
  });

  it('should include peer dependencies if peer deps disabled', () => {
    const rollup = config(autoExternal({ peerDependencies: false }));

    expect(rollup.plugins).toEqual([]);
  });

  it('should not include peer dependencies if peer deps enabled', () => {
    const rollup = config(autoExternal({ peerDependencies: true }));

    expect(rollup.plugins).toEqual([
      expect.objectContaining({ name: 'peer-deps-external' }),
    ]);
  });

  it('should prevent plugin duplication', () => {
    const rollup = config(
      autoExternal({ peerDependencies: true }),
      autoExternal({ peerDependencies: true })
    );

    expect(rollup.plugins).toEqual([
      expect.objectContaining({ name: 'peer-deps-external' }),
    ]);
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
        plugins: [
          expect.objectContaining({ name: 'peer-deps-external' }),
          expect.objectContaining({ name: 'rpt2' }),
        ],
      })
    );
  });
});
