import autoExternal from '../autoExternal';
import { merge } from '../utils';

describe(merge, () => {
  it('should merge configuration options for duplicate builders', () => {
    const builders = merge([
      autoExternal({ dependencies: true, peerDependencies: true }),
      autoExternal({ peerDependencies: false }),
    ]);

    expect(builders[0].options).toMatchObject({
      dependencies: true,
      peerDependencies: false,
    });
  });
});
