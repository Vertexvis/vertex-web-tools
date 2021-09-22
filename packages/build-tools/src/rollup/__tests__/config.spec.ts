import { autoExternal } from '../autoExternal';
import { commonJs } from '../commonJs';
import { config, defineConfig } from '../config';
import { input } from '../input';
import { minify } from '../minify';
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

  it('should not include peer dependencies by default', () => {
    const rollupConfig = defineConfig();
    expect(rollupConfig.plugins?.autoExternal).toMatchObject({
      peerDependencies: true,
    });
  });

  it('should not include peer dependencies when external peer dependencies enabled', () => {
    const rollupConfig = defineConfig(autoExternal({ peerDependencies: true }));
    expect(rollupConfig.plugins?.autoExternal).toMatchObject({
      peerDependencies: true,
    });
  });

  it('should include peer dependencies when external peer dependencies disabled', () => {
    const rollupConfig = defineConfig(
      autoExternal({ peerDependencies: false })
    );
    expect(rollupConfig.plugins?.autoExternal).toMatchObject({
      peerDependencies: false,
    });
  });
});

describe(config, () => {
  it('should prevent plugin duplication', () => {
    const rollupConfig = config(
      autoExternal({ peerDependencies: false }),
      autoExternal({ peerDependencies: true })
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
