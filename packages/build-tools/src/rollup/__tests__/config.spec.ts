import { autoExternal } from '../autoExternal';
import { config, defineConfig } from '../config';
import { input } from '../input';
import { minify } from '../minify';
import { output } from '../output';
import { typescript } from '../typescript';

describe(defineConfig, () => {
  it('should consolidate plugin configuration', () => {
    expect(
      defineConfig(
        autoExternal({ peerDependencies: false }),
        autoExternal({ dependencies: true })
      ).plugins?.autoExternal
    ).toMatchObject({
      peerDependencies: false,
      dependencies: true,
    });
  });
});

describe(config, () => {
  it('should prevent plugin duplication', () => {
    const rollupConfig = config(
      autoExternal({ peerDependencies: false }),
      autoExternal({ dependencies: true })
    );

    expect(rollupConfig.plugins).toHaveLength(1);
  });

  it('should generate a valid rollup config', () => {
    const rollupConfig = config(
      input('src/index.ts'),
      output({ formats: ['esm'] }),
      typescript(),
      minify()
    );

    expect(rollupConfig.plugins).toHaveLength(3);
    expect(rollupConfig).toMatchObject(
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
          }),
        ],
      })
    );
  });
});
