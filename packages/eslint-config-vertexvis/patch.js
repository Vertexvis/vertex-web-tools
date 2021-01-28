// This monkey patches eslint to lookup ESLint plugins relative to a sharable
// config's NPM package. This allows a consuming package to use a sharable
// config's plugins without having to add the plugins as NPM dependencies.
//
// To use, require this patch from your .eslintrc.js file.
//
// ```ts
// require('@vertexvis/eslint-config-vertexvis');
//
// module.exports = {
//   extends: '@vertexvis/vertexvis'
// };
// ```

const path = require('path');

let currentModule = module;
while (
  !/[\\/]eslint[\\/]lib[\\/]cli-engine[\\/]config-array-factory\.js/i.test(
    currentModule.filename
  )
) {
  if (!currentModule.parent) {
    // This was tested with ESLint 6.1.0; other versions may not work
    throw new Error(
      'Failed to patch ESLint because the calling module was not recognized'
    );
  }
  currentModule = currentModule.parent;
}
const eslintFolder = path.join(path.dirname(currentModule.filename), '../..');

const configArrayFactoryPath = path.join(
  eslintFolder,
  'lib/cli-engine/config-array-factory'
);
const configArrayFactoryModule = require(configArrayFactoryPath);

const moduleResolverPath = path.join(
  eslintFolder,
  'lib/shared/relative-module-resolver'
);
const ModuleResolver = require(moduleResolverPath);

const originalLoadPlugin =
  configArrayFactoryModule.ConfigArrayFactory.prototype._loadPlugin;
configArrayFactoryModule.ConfigArrayFactory.prototype._loadPlugin = function (
  name,
  importerPath,
  importerName
) {
  const originalResolve = ModuleResolver.resolve;
  try {
    ModuleResolver.resolve = function (moduleName, relativeToPath) {
      // resolve using importerPath instead of relativeToPath
      return originalResolve.call(this, moduleName, importerPath);
    };
    return originalLoadPlugin.apply(this, arguments);
  } finally {
    ModuleResolver.resolve = originalResolve;
  }
};
