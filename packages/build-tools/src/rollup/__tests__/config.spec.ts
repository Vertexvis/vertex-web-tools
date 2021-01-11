import autoExternal from '../autoExternal';
import config from '../config';

describe(config, () => {
  it('should prevent plugin duplication', () => {
    expect(
      config(
        autoExternal({ peerDependencies: false }),
        autoExternal({ dependencies: true })
      ).plugins?.length
    ).toBe(1);
  });

  it('should merge configuration for plugins', () => {
    const builder = jest.fn(() => ({}));
    const fakePlugin1 = {
      name: 'test',
      options: { first: true },
      fn: builder,
    };
    const fakePlugin2 = {
      name: 'test',
      options: { second: true },
      fn: builder,
    };

    config(fakePlugin1, fakePlugin2);

    expect(builder).toHaveBeenCalledWith(expect.anything(), {
      first: true,
      second: true,
    });
  });
});
